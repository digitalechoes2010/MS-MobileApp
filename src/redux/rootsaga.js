

import { watchLoginSaga } from './Loginsaga'
import { all,fork } from 'redux-saga/effects';
export default function* watcherSaga() {
    yield all([
     
      fork(watchLoginSaga),
 
    ]);
  }