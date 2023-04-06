import * as types from "./Loginactiontype";

const initialState = {
  isLoggedIn: false,
  id: null,
  username: null,
  email: null,
  phonenumber: null,
  location: null,
  description: null,
  profilepic:null,
  dateofbirth: null,
  typeaccount: null,
  isAdmin: null,
  token:null,
  errors :{},
  userData:null
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        email: action.request.email,
       
        password: action.request.password,
        errors: {},
      };
    
    case types.LOGIN_RESPONSE:
      return {
        ...state,
        isLoggedIn: true,
        errors: {},
        userData: action.response,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        errors: action.response.errors,
        isLoading: false,
      };
    case types.LOG_OUT:
      return Object.assign({}, initialState);
   
    default:
      return state;
  }
};

export default LoginReducer;