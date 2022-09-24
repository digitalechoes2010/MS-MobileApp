import React, {useEffect} from 'react';
import {StyleSheet, View,Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

function Metrolocation(props) {

  return(
      <>
<View style={styles.container}>
<MapView 
     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
 style={styles.map}
     region={{
       latitude: 33.884097,
       longitude: 35.490646,
       latitudeDelta: 0.015,
       longitudeDelta: 0.0121,
     }}
   >
      
      <Marker style={{width:50,height:50}}   coordinate={{ latitude: 33.884097,
                    longitude: 35.490646}}  description="Metropolitan Security"
                    title="Metropolitan Security"  
                    >


<Image  style={{width: 50, height:50}}
    resizeMode="contain"
                source={
                    require('../../assets/MSshield.png')
                   
                   } 

                   
                    
                    />  
                    </Marker>



     
   </MapView>

   </View>



      </>


  )};
export default Metrolocation;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '90%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '10%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,

    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
});
