import { all, call } from 'redux-saga/effects';

import {
  fetchUserStart,
  setLastReadMsgWatcher,
  uploadPhotoWatcher,
} from './user-sagas';
import {
  fetchMessagesStart,
  listenNewMessagesWatcher,
  getchMessagesSimpleWatcher,
  sendMessageWatcher,
} from './chat-saga';

import {
  fetchRequestWatcher,
  sendRequestWatcher,
  updateRequestWatcher,
} from './lead-saga';

import { fetchClientsWatcher, updateClientWatcher } from './admin-saga';

export default function* rootSaga() {
  yield all([
    call(fetchUserStart),
    call(setLastReadMsgWatcher),
    call(uploadPhotoWatcher),
    call(fetchMessagesStart),
    call(listenNewMessagesWatcher),
    call(getchMessagesSimpleWatcher),
    call(sendMessageWatcher),
    call(fetchRequestWatcher),
    call(sendRequestWatcher),
    call(updateRequestWatcher),
    call(fetchClientsWatcher),
    call(updateClientWatcher),
  ]);
}
