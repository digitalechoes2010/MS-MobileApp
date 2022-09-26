import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import userReducer from './reducers';
import AsyncStorage from '@react-native-community/async-storage';
import loginreducer from './Loginreducer';
import DistanceReducer from './distanceReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const RootReducer = combineReducers({
  userReducer,loginreducer, DistanceReducer

});
export default persistReducer(persistConfig, RootReducer);
