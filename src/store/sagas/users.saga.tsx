import { call, put, takeLatest } from "redux-saga/effects";

import  GetUsers  from "../../services/users.service";

import { usersSet } from "../actions/users.action";

import { USERS_GET } from "../actionTypes/users.types.d";

export function* handleGetUsers() :any {

  try {

    const response = yield call(GetUsers);

    if (response.status === 200) {

      const { data } = response;

      console.log("product data", data);

      yield put(usersSet(data));

    } else {

      throw new Error("Could not connect to API");

    }

  } catch (err) {

    console.log(err);

  }

}

export function* watchuserssaga() {

    yield takeLatest(USERS_GET, handleGetUsers);
  
  }
