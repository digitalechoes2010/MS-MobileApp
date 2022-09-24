import {call, put, takeEvery} from 'redux-saga/effects';
import {LoginUser} from '../services/loginservices';
import {navigationRef} from '../navigation/index';
import * as LoginActions from './Loginaction';
import * as types from './Loginactiontype';
//import { resetUserReducer } from "../../Actions/userActionCreator";
// import { setUserdata } from "../Actions/UserActions";

import AsyncStorage from '@react-native-community/async-storage';
export function* loginAsync(action) {
  try {
    let response;
    response = yield call(LoginUser, action.request);
    if (response.status === 200) {
      // console.log(data);
      console.log(response.data);
      yield AsyncStorage.setItem('token', response.data.token);
      // localStorage.setItem("refreshToken", refreshToken);
      yield put(LoginActions.onLoginResponse(response.data));

      console.log('sucessssssssssss');

      // yield delay(500);
      navigationRef.navigate('Profile');
      console.log(response);
    } else {
      throw response.data.error;
    }
  } catch (err) {
    console.log(err);
    console.log('faileddddd');
    navigationRef.navigate('Login',{yess:"1"});
    yield put(LoginActions.loginFailed({errors: err}));
  }
}

export function* logout() {
  yield AsyncStorage.setItem('token', '');
  // localStorage.setItem("refreshToken", "");

  //  yield put(resetUserReducer());
}
export function* watchLoginSaga() {
  yield takeEvery(types.LOGIN_REQUEST, loginAsync);
  yield takeEvery(types.LOG_OUT, logout);
}
