import { takeLatest, put, select, call, delay } from 'redux-saga/effects';

import { messagesRequested } from '../actions';
import {
  selectMsgLoadingInit,
  selectChapiService,
  selectLeadLoadingInit,
  selectClients,
} from '../selectors';

import { showPopup } from '../components/hoc';

// ----------------- WORKERS -----------------
export function* fetchUserAsync(action) {
  try {
    const { reqParams, message } = action.payload;
    const { userRequest } = yield select(selectChapiService);
    const data = yield call(userRequest, ...reqParams);
    const user = data ? data.user : {};
    yield put({ type: 'FETCH_USER_SUCCESS', payload: user });

    // Request messages for init mainpage
    if (user._id) {
      const isMsgLoaded = yield select(selectMsgLoadingInit);
      const isLeadLoaded = yield select(selectLeadLoadingInit);
      if (isMsgLoaded) {
        yield put(messagesRequested());
      }
      if (isLeadLoaded) {
        yield put({ type: 'FETCH_REQUESTS' });
      }
    }

    if (user.role === 'admin') {
      const clients = yield select(selectClients);
      if (!clients) {
        yield put({ type: 'FETCH_CLIENTS_START' });
      }
    }
    // Popup if need
    if (message) showPopup(message);
  } catch (error) {
    yield put({ type: 'FETCH_USER_ERROR', payload: error });
  }
}

export function* setLastReadMsgWorker(action) {
  try {
    yield delay(1000);
    const { userRequest } = yield select(selectChapiService);
    yield userRequest('updateMe', {
      lastReadMsg: action.payload,
    });
  } catch (error) {
    yield put({ type: 'FETCH_USER_ERROR', payload: error });
  }
}

export function* uploadPhotoWorker(action) {
  try {
    const { uploadPhoto } = yield select(selectChapiService);
    const { user } = yield uploadPhoto(action.payload);
    yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
  } catch (error) {
    yield put({ type: 'FETCH_USER_ERROR', payload: error });
  }
}

// ----------------- WATCHERS -----------------
export function* fetchUserStart() {
  yield takeLatest('FETCH_USER_START', fetchUserAsync);
}

export function* setLastReadMsgWatcher() {
  yield takeLatest('SET_LAST_READ_MESSAGE', setLastReadMsgWorker);
}

export function* uploadPhotoWatcher() {
  yield takeLatest('UPLOAD_PHOTO', uploadPhotoWorker);
}
