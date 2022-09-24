import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/Splash/index';
import Login from '../screens/Login/index';
import Dashboard from '../screens/Dashboard/index';
import Homescreen from '../screens/Homescreen/Test';
import Allalerts from '../screens/Homescreen/Allalerts';
import Detailalert from '../screens/Alertdetail/Alertdetail';
import Mapdetail from '../screens/Alertdetail/Mapdetail';

import Emergencylist from '../screens/Emergency';
import Profile from '../screens/Profile/ProfilePress';

import {NavigationContainer} from '@react-navigation/native';
import Location from '../screens/Profile/Location.js';
import {createNavigationContainerRef} from '@react-navigation/native';
import Panicbutton from '../screens/Panicbutton/index';
import Policemap from '../screens/Maps/Policemap';
import Nationalmap from '../screens/Maps/Nationalmap';
import Hospitalmap from '../screens/Maps/Hospitalmap';
import Embassiesmap from '../screens/Maps/Embassies';

export const navigationRef = createNavigationContainerRef();
import React from 'react';
const index = () => {
  const Stack = createStackNavigator();
 
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }} initialRouteName="Splash"
        >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Alerts" component={Allalerts} />
        <Stack.Screen name="Emergency" component={Emergencylist} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Panicbutton" component={Panicbutton} />
        <Stack.Screen name="Detail" component={Detailalert} />
        <Stack.Screen name="Mapdetail" component={Mapdetail} />
        <Stack.Screen name="Policemap" component={Policemap} />
        <Stack.Screen name="Nationalmap" component={Nationalmap} />
        <Stack.Screen name="Hospitalmap" component={Hospitalmap} />
        <Stack.Screen name="Embassiesmap" component={Embassiesmap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
