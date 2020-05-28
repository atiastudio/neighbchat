import { takeLatest, takeEvery, put, select, call } from 'redux-saga/effects';

import { selectChapiService } from '../selectors';

// ----------------- WORKERS -----------------
function* fetchClientsWorker(action) {
  try {
    const { clientRequest } = yield select(selectChapiService);
    const { data } = yield call(clientRequest, 'getClients');
    // console.log('SAGA: this is data:', data);
    yield put({ type: 'FETCH_CLIENTS_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_CLIENTS_ERROR', payload: error });
  }
}

function* updateClientWorker(action) {
  const { body, _id } = action.payload;
  try {
    const { clientRequest } = yield select(selectChapiService);
    const { data } = yield call(clientRequest, 'updateClient', body, _id);
    // console.log('SAGA: this is data:', data);
    yield put({ type: 'FETCH_CLIENT_UPDATED', payload: data });
    yield put({ type: 'U', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_CLIENTS_ERROR', payload: error });
  }
}

// ----------------- WATCHERS -----------------
export function* fetchClientsWatcher() {
  yield takeLatest('FETCH_CLIENTS_START', fetchClientsWorker);
}

export function* updateClientWatcher() {
  yield takeEvery('UPDATE_CLIENT', updateClientWorker);
}
