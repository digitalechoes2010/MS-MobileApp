import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet  ,Text ,View ,PermissionsAndroid,Image,RefreshControl, Platform, PixelRatio, Dimensions} from 'react-native';
import {Provider} from 'react-native-paper';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen'

import BottomSheet from './BottomSheet';
import Home from '../Homescreen/hometest';

import Listalerts from '../Homescreen/FlatListDemo';
import Geocoder from 'react-native-geocoding';
import {useSelector, useDispatch} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import {getspecialnews} from '../../redux/actions';
import TextTicker from 'react-native-text-ticker';



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function ProfilePress(){
  const [refreshing, setRefreshing] = React.useState(false);

  const {specialnews} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
  const[overlayvisible,setOverlayvisible]=useState(false);
  const [show,setShow] =useState(true);
  const [latitude,setLatitude]=useState('');
  const [longitude,setLongitude]=useState('');
  const [error,setError]=useState('');
  const [address,setAddress]=useState('Beirut');  
  const [unitval,setUnitval] = useState('miles');
  const [divval,setdivval] =useState(1);
  const [forecast,setForecast] =useState([]);
  const[temperature,setTempareture] =useState('');
  const[temperaturehigh,setTempareturehigh] =useState('');
  const[temperaturelow,setTempareturelow] =useState('');
  const [descrip,setDescrip]=useState('');

  const [imagelink,setImagelink]=useState('');
const [aboutyes,setAboutyes] = useState('no');

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const updateyes = () =>{
  setAboutyes('yes');
}


const updateno = () =>{
  setAboutyes('no');
}

  const updateunitmiles = () => {
setUnitval('miles');
setdivval(0.00062);
  }
  const updateunitkmiles = () => {
    setUnitval('km');
    setdivval(0.001);
  }


  useEffect (() => {
console.log(aboutyes)

    Geocoder.init('AIzaSyCrYvbk8juHM0IxdHqYd5WxMV5oOIkW1p0'); // use a valid API key
   
    dispatch(getspecialnews());




async function requestPermissions() {


  
    if (Platform.OS === 'ios') {
      getWeather(33.888630,35.495480);
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if(auth === "granted") {
         // do something if granted...
         Geolocation.getCurrentPosition(

          (position) => {
            setOverlayvisible(true);
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);

     getWeather(position.coords.latitude,position.coords.longitude); //,{temperature}°C, {descrip}
            
  
              Geocoder.from(position.coords.latitude, position.coords.longitude)
  
  
                  .then(json => {
                    var addressComponent = json.results[4].formatted_address;
  
              setAddress(addressComponent);
  setOverlayvisible(false)
                     
                      
  
                  })
               
  
                  .catch(error => console.warn(error));
  
          },
          
  
  
          (error) => {
  
              // See error code charts below.
  setError(error.message)
              
                 
     },
   {enableHighAccuracy: false,
     timeout: 10000,
  maximumAge: 100000
  }   );
      }
    }
  
    if (Platform.OS === 'android') {
     
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
     
      getWeather(33.888630,35.495480);
      
      if ( PermissionsAndroid.RESULTS.GRANTED === "granted") {
       
        Geolocation.getCurrentPosition(

            (position) => {
              setOverlayvisible(true);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

       getWeather(position.coords.latitude,position.coords.longitude); //,{temperature}°C, {descrip}
              
    
                Geocoder.from(position.coords.latitude, position.coords.longitude)
    
    
                    .then(json => {
                      var addressComponent = json.results[4].formatted_address;
    
                setAddress(addressComponent);
    setOverlayvisible(false)
                       
                        
    
                    })
                 
    
                    .catch(error => console.warn(error));
    
            },
            
    
    
            (error) => {
    
                // See error code charts below.
    setError(error.message)
                
                   
       },
     {enableHighAccuracy: false,
       timeout: 10000,
    maximumAge: 100000
    }   );
        }
       
  
      
    }
    
  }

requestPermissions()


  },[])

 const getWeather = async (latitudeee,longitudeee) => {
  const api_call = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?lat='+latitudeee+'&lon='+longitudeee+'&units=metric&appid=54c65815a55fb2a46ebc15379492bb70'
  );
  const data = await api_call.json();

setTempareture(Math.round(data.main.temp))
setTempareturelow(Math.round(data.main.temp_min))
setTempareturehigh(Math.round(data.main.temp_max))
setDescrip(data.weather[0].description)
setImagelink('http://openweathermap.org/img/w/04n.png');



}



  

return(
<>
<Provider>
<View style={styles.container}>

<BottomSheet updatenno={updateno} aboutyess={aboutyes} updatemiles={updateunitmiles} updatekm={updateunitkmiles} address={address}
temperature={temperature} description={descrip}   ></BottomSheet>

</View>
<View style={styles.container2}>
{specialnews &&
            specialnews.map(news => (
              <TextTicker key={news.id} 
              style={[styles.textbutton, {fontSize:normalize(12)}]}
              duration={15000}
              loop
              bounce
              repeatSpacer={50} shouldAnimateTreshold={40}
              marqueeDelay={1000} 
            >
               {news.title}
            </TextTicker>
            ))}





</View>

<View style={{height:"auto",width:"100%",flex:1,backgroundColor:"transparent",position:"absolute"
,marginTop: Platform.OS === 'ios' ? '28%' : '18%'}}>
    <>

    <Home updateab={updateyes}  latitude={latitude} longitude={longitude} unit={unitval} division={divval}></Home>
   
    </>
</View>
<OrientationLoadingOverlay
          visible={overlayvisible}
          color="white"
          indicatorSize="large"
          messageFontSize={24} style={styles.overlaycontainer}
          
          />
</Provider>
</>
)
}

const styles= StyleSheet.create({
  textbutton: {
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color:"black",alignSelf:"center"
   
  },

  overlaycontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    container:{
     
        backgroundColor:"white",
       alignItems:"center",
       justifyContent:"center",
        height:Platform.OS === 'ios' ? hp('10%') : hp('5%'),
        zIndex:100,
    
       
        
    },
    container2:{
     
        backgroundColor:"white",
        paddingHorizontal: '2%',
        zIndex:100,
        display:"flex",
        flexDirection:"row",alignItems:"center",
        
    
       
        
    }
})

