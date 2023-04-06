import { SET_USER_NAME, SET_USER_AGE, INCREASE_AGE, GET_CITIES ,GET_RISKNEWS ,GET_SPECIALNEWS} from './actions';

const initialState = {
   
    cities: [],
    risknews :[],
    specialnews:[]
}

function userReducer(state = initialState, action) {
    switch (action.type) {
       
        case GET_CITIES:
            return { ...state, cities: action.payload.reverse() };
        case GET_RISKNEWS:
            return { ...state, risknews: action.payload.reverse() };
        case GET_SPECIALNEWS:
            return {...state, specialnews: action.payload }
        default:
            return state;
    }
}

export default userReducer;