import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './Saga/RootSaga';
import rootreducer from './rootreducer';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
    reducer: rootreducer,
    middleware:()=> [sagaMiddleware],
  });
//   sagaMiddleware.run(rootSaga);

export default store;
