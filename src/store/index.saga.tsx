import * as Eff from 'redux-saga/effects';
import { watchuserssaga } from './sagas/users.saga';

const fork = Eff.fork;
const all = Eff.all;

export default function* ApplicationSaga() {
  yield all([
    
    fork(watchuserssaga),
  ]);
}