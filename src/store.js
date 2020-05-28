import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
// import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootRecuver from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(rootRecuver, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
