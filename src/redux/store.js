import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import RootReducer from './index.reducer';
import createSagaMiddleware from '@redux-saga/core'
import watcherSaga from './rootsaga';

const sagaMiddleware = createSagaMiddleware();

export const Store = createStore(RootReducer, applyMiddleware(thunk,sagaMiddleware));

export const persistor = persistStore(Store);
sagaMiddleware.run(watcherSaga)