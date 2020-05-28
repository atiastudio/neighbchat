import {
  take,
  takeEvery,
  takeLatest,
  put,
  select,
  call,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import moment from 'moment';

import {
  selectMsgPage,
  selectLastReadMsg,
  selectChapiService,
  selectUserId,
} from '../selectors';
import { getNormDate } from '../utils';

// ----------------- WORKERS ------------------------
export function* fetchMessagesAsync() {
  try {
    const lastReadMsg = yield select(selectLastReadMsg);
    const { messageRequest } = yield select(selectChapiService);
    let readMsgPresent = false;
    let messages = [];

    // User is supposed to start from the last read message
    do {
      const pageMsg = yield select(selectMsgPage);
      const data = yield messageRequest(
        'getMessages',
        null,
        `page=${pageMsg}&limit=20`
      );
      const messagesNew = data.data;
      if (messagesNew.length !== 0) {
        yield put({ type: 'INCREASE_MSG_PAGE' });
        readMsgPresent = messagesNew.find((el) => el.createdAt < lastReadMsg);
        messages = [...messages, ...messagesNew];
      } else {
        readMsgPresent = true;
        yield put({ type: 'THE_END' });
      }
    } while (!readMsgPresent);

    // Create date service messages
    const dates = yield messages.map((el) => {
      const startOfDay = moment(el.createdAt).startOf('date');
      return {
        _id: `service_${startOfDay.format('x')}`,
        createdAt: startOfDay.toISOString(),
        text: getNormDate(startOfDay.format()),
      };
    });

    // Create unread service message
    const unReadMark = yield messages.find((el) => el.createdAt > lastReadMsg)
      ? [
          {
            _id: 'service_unreadmark',
            createdAt: lastReadMsg,
            text: 'Unread messages',
          },
        ]
      : [];

    // Current state
    // const messagesOld = yield select(selectMessages);

    // New messages (+deduplication and sort)
    messages = [...dates, ...messages, ...unReadMark]
      // .filter((v, i, a) => a.find((el) => el._id === v._id) === v)
      .sort((a, b) => {
        if (a.createdAt > b.createdAt) return 1;
        if (a.createdAt < b.createdAt) return -1;
        return 0;
      });

    // Save messages to state
    yield put({ type: 'FETCH_MSG_SUCCESS', payload: messages });
  } catch (error) {
    yield put({ type: 'FETCH_MSG_ERROR', payload: error });
  }
}

export function* sendMessageWorker(action) {
  const text = action.payload;
  // Creating dummy message
  const _id = yield select(selectUserId);
  const createdAt = moment().toISOString();
  const dummyMsg = {
    _id: `dummy_message_${createdAt}`,
    createdAt,
    text,
    user: { _id },
  };
  try {
    // Set last read message and dummy message
    yield put({ type: 'SET_LAST_READ_MESSAGE', payload: dummyMsg.createdAt });
    yield put({ type: 'FETCH_MSG_SUCCESS_FRONT', payload: dummyMsg });
    // Sending real message
    const { messageRequest } = yield select(selectChapiService);
    const { data } = yield call(messageRequest, 'sendMessage', { text });
    // Saving real message
    // console.log('SAGA: this is message:', data);
    // yield put({ type: 'FETCH_MSG_UPDATED_SENT', payload: data });
    // Set last read message
    yield put({ type: 'SET_LAST_READ_MESSAGE', payload: data.createdAt });
  } catch (error) {
    console.error('SAGA: сообщение не отправлено', error);
    dummyMsg.isError = true;
    yield put({ type: 'FETCH_MSG_UPDATED', payload: dummyMsg });
  }
}

export function* getchMessagesSimpleWorker(action) {
  try {
    const { messageRequest } = yield select(selectChapiService);
    yield call(messageRequest, ...action.payload);
    // Temporary
    // if (action.payload[0] === 'sendMessage') {
    //   yield call(setLastReadMsg, Date.now() + 1000);
    // }
  } catch (error) {
    yield put({ type: 'FETCH_MSG_ERROR', payload: error });
  }
}

// ----------------- WATCHERS ------------------------
export function* fetchMessagesStart() {
  yield takeLatest('FETCH_MSG_START', fetchMessagesAsync);
}

export function* sendMessageWatcher() {
  yield takeEvery('SEND_MESSAGE', sendMessageWorker);
}

export function* getchMessagesSimpleWatcher() {
  yield takeEvery('FETCH_MSG_SIMPLE', getchMessagesSimpleWorker);
}

// ----------------- SOCKET ------------------------

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const newMessageHandler = (message) => {
      emit({ type: 'message', message });
    };

    const updateMessageHandler = (message) => {
      emit({ type: 'message updated', message });
    };

    const disconnected = (message) => {
      emit({ type: 'disconnected' });
    };
    const connected = (message) => {
      emit({ type: 'connected' });
    };

    // setup the subscription
    socket.on('message', newMessageHandler);
    socket.on('message updated', updateMessageHandler);
    socket.on('connect_error', disconnected);
    socket.on('connect', connected);

    const unsubscribe = () => {
      socket.off('message', newMessageHandler);
      socket.off('message updated', updateMessageHandler);
      socket.off('connect_error', disconnected);
      socket.off('connect', connected);
    };

    return unsubscribe;
  });
}

export function* listenNewMessagesWatcher() {
  const { socket } = yield select(selectChapiService);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      const { type, message } = yield take(socketChannel);
      if (type === 'message') {
        const userId = yield select(selectUserId);
        const actionType =
          message.user._id === userId
            ? 'FETCH_MSG_UPDATED_SENT'
            : 'FETCH_MSG_SUCCESS_FRONT';
        yield put({ type: actionType, payload: message });
      }
      if (type === 'message updated') {
        yield put({ type: 'FETCH_MSG_UPDATED', payload: message });
      }
      if (type === 'disconnected') {
        yield put({ type: 'DISCONNECTED' });
      }
      if (type === 'connected') {
        yield put({ type: 'CONNECTED' });
      }
    } catch (error) {
      yield put({ type: 'FETCH_MSG_ERROR', payload: error });
    }
  }
}
