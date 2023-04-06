import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';

import usersreducer from './reducers/users.reducer';


export const RootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
   
    Users: usersreducer,
  });

  