import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid, Button, Alert } from 'react-native';

const Container = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Label = Styled.Text`
    font-size: 24px;
`;

const CurrentPosition = () => {
  const [latitudee, setLatitudee] = useState(33.888630);
  const [longitudee, setLongitudee] = useState(35.495480);



  

  const getme = () => {
    
   

    async function requestPermissions() {



        if (Platform.OS === 'ios') {
          const auth = await Geolocation.requestAuthorization("whenInUse");
          if(auth === "granted") {
             // do something if granted...

             Alert.alert(PermissionsAndroid.RESULTS.GRANTED);
             Geolocation.getCurrentPosition(
                 position => {
                  const latitude =position.coords.latitude;
                  const longitude = position.coords.longitude;
                   setLatitudee(latitude);
                   setLongitudee(longitude);
                 },
                 error => {
                  Alert.alert("Please Turn on your location");
                 },
                 {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
               );
          }
        }
      
        if (Platform.OS === 'android') {
         
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if ( PermissionsAndroid.RESULTS.GRANTED === "granted") {
            Alert.alert(PermissionsAndroid.RESULTS.GRANTED);
            Geolocation.getCurrentPosition(
                position => {
                 const latitude =position.coords.latitude;
                 const longitude = position.coords.longitude;
                  setLatitudee(latitude);
                  setLongitudee(longitude);
                },
                error => {
                 Alert.alert("Please Turn on your location");
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
              );}
      
          
        }
      }
  requestPermissions()
    }




  

  return (
    <Container>
     
          <>
        <Label>Latitude: {latitudee}</Label>
          <Label>Latitude: {longitudee}</Label>

        <Button title="Press" onPress={getme}></Button>
        </>
    
    </Container>
  );
};

export default CurrentPosition;