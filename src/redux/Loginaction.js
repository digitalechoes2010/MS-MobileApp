import * as types from "./Loginactiontype";

export function requestLogin(request) {
  return {
    type: types.LOGIN_REQUEST,
    request,
  };
}

export function loginFailed(response) {
  return {
    type: types.LOGIN_FAILED,
    response,
  };
}
export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}
export function logout() {
  return {
    type: types.LOG_OUT,
  };
}