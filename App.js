import React,{useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from './src/navigation/index';
import {persistor, Store} from './src/redux/store';
import pushnot from './src/services/push-notifications.service';
import SplashScreen from "react-native-lottie-splash-screen";

export default function App() {
  useEffect(() => {
    setTimeout(() => {  SplashScreen.hide(); }, 2700);
  }, []);
  pushnot();

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Navigator></Navigator>
      </PersistGate>
    </Provider>
  );
}
