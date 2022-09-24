import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory ,History} from 'history';
import { loadState } from '../lib/localstorage/load.state';
import { saveState } from '../lib/localstorage/store.state';
import ApplicationSaga from './index.saga';
import { RootReducer } from './index.reducer';


export const history = createBrowserHistory({
 
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const persistedState = loadState();

export const store = createStore(
  RootReducer(history),
  persistedState,
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

store.subscribe(() => {
  saveState({
    
  });
});
sagaMiddleware.run(ApplicationSaga);