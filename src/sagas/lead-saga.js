import { takeEvery, takeLatest, put, select, call } from 'redux-saga/effects';

import { selectLeadPage, selectChapiService } from '../selectors';

// -------------- WORKERS --------------
function* fetchRequestWorker(action) {
  try {
    const page = yield select(selectLeadPage);
    const { requestRequest } = yield select(selectChapiService);
    yield put({ type: 'FETCH_LEAD_START' });
    const { data } = yield call(requestRequest, 'getRequests', null, page);
    // console.log('SAGA: This is res:', data);
    yield put({ type: 'FETCH_LEAD_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_LEAD_ERROR', payload: error });
  }
}

function* sendRequestWorker(action) {
  const request = action.payload;
  try {
    const { requestRequest } = yield select(selectChapiService);
    yield put({ type: 'FETCH_LEAD_START' });
    const { data } = yield call(requestRequest, 'sendRequest', { request });
    // console.log('SAGA: This is res:', data);
    yield put({ type: 'FETCH_LEAD_SUCCESS_NEW', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_LEAD_ERROR', payload: error });
  }
}

function* updateRequestWorker(action) {
  const { body, _id } = action.payload;
  try {
    const { requestRequest } = yield select(selectChapiService);
    // yield put({ type: 'FETCH_LEAD_START' });
    const { data } = yield call(
      requestRequest,
      'updateRequest',
      body,
      null,
      _id
    );
    // console.log('SAGA: This is res:', data);
    yield put({ type: 'FETCH_LEAD_UPDATED', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_LEAD_ERROR', payload: error });
  }
}

// -------------- WATCHERS --------------
export function* fetchRequestWatcher() {
  yield takeLatest('FETCH_REQUESTS', fetchRequestWorker);
}

export function* sendRequestWatcher() {
  yield takeLatest('SEND_REQUEST', sendRequestWorker);
}

export function* updateRequestWatcher() {
  yield takeEvery('UPDATE_REQUEST', updateRequestWorker);
}
