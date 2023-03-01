import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Animated,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Easing,TouchableWithoutFeedback, PixelRatio, Platform
} from 'react-native';
import {Portal, Provider, List} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Myinformation from './Myinformation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import CustomSwitch from './customswitch';
import {logout} from '../../redux/Loginaction';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getspecialnews} from '../../redux/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setKilometers, setMiles} from '../../redux/distanceActionCreator';


import { SvgXml } from 'react-native-svg';

import TextTicker from 'react-native-text-ticker';

import * as OpenAnything from 'react-native-openanything';


const BottomSheet = props => {
  const bottomSheetHeight = Dimensions.get('window').height * 0.9;
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get('window').width;
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
  const [open, setOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [unitvalue, setUnitvalue] = useState('Km');
  const scrollRef = useRef();
  
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

  const {specialnews} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
const updateleee = () =>{
  console.log("hiii")
          setOpen(false);
          props.updatenno();
}

{console.log("Distance", props.distanceData)}

  const onSelectSwitch = index => {
    if (index === 'Km') {
      setUnitvalue('Km');
      props.setKilometers()
      props.updatekm();
    } else {
      setUnitvalue('Miles');
      props.setMiles();
      props.updatemiles();
    }
  };

  const onGesture = event => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = event => {
    if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
      updateleee();
    } else {
      bottom.setValue(0);
    }
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '92%',
          backgroundColor: '#CED0CE',
          marginLeft: '4%',
        }}
      />
    );
  };

  useEffect(() => {
    dispatch(getspecialnews());
    if(props.logindata.isLoggedIn == true){
    checkImage('https://echoes.agency/files/'+props.logindata.userData.email+'.png');}
    if (open) {
      setOpen(open);
      Animated.spring(bottom, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
        friction: 6,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        updateleee();
      });
    }
console.log('bbbbbbbbbbbbbbbbbbbbbb'+props.aboutyess);
if(props.aboutyess === "yes"){
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+props.aboutyess)
  setOpen(true);
  scrollRef.current?.scrollTo({
    y: 400,
    animated: true,
  });
}

  }, [open,props.aboutyess]);

  

  function checkImage(url) {
    console.log(url);
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
     
      if (request.status == 200) //if(statusText == OK)
      {
        console.log("image exists");
       setCheckifexists('1');
      } else {
        console.log("image doesn't exist");
        setCheckifexists('0');
      }
    }
  }
  const [checkifexists,setCheckifexists] = useState('0');
  return (
    <>
    
      <SafeAreaView>
        <View style={styles.viewbutton}>

          <View style={{display:"flex",flexDirection:"row",width:'96%', alignItems: 'center'}}>
            <View style={{height:normalize(16),width:normalize(16),borderRadius:10,backgroundColor:"#083288",justifyContent:"center"}}>


            <MaterialIcons name="wb-sunny" size={normalize(12)} color="white" style={{alignSelf:"center"}}/>
            </View>
            <TextTicker 
              loop
              bounce
              repeatSpacer={50} shouldAnimateTreshold={40}
              marqueeDelay={1000}  style={[styles.textbutton, {fontSize:normalize(12)}]}> {props.address} {props.temperature}°C, {props.description} 
         </TextTicker>
         </View>
        
          {props.logindata.isLoggedIn == true ? 
            <TouchableOpacity
            style={styles.pfstyle2}
            onPress={() => setOpen(true)}>
          
           {
             checkifexists == '1' ? 
                <Image
              style={styles.pfstyle2imageee}
             
              source={{uri:'https://echoes.agency/files/'+ props.logindata.userData.email+'.png' }}
            />
             :
             <Image
              style={styles.pfstyle2imageee}
             
              source={require('../../assets/defaultpf.png')}
            />

           }
            
          </TouchableOpacity>
          :
          <TouchableOpacity
          style={styles.pfstyle2}
          onPress={() => setOpen(true)}>
          <Image
            style={styles.pfstyle2imagedefault}
            source={require('../../assets/defaultpf.png')}
          />
        </TouchableOpacity>
}


        </View>

        <Portal>
          <Animated.View
            style={[
              styles.root,
              {
                bottom: bottom,
                height: bottomSheetHeight,
                shadowOffset: {
                  height: -3,
                },
              },
              styles.common,
            ]}>
            <PanGestureHandler
              onGestureEvent={onGesture}
              onEnded={onGestureEnd}>
              <View
                style={[
                  styles.header,
                  styles.common,
                  {shadowOffset: {height: 3}},
                ]}>
                <View
                  // style={{
                  //   // width: 60,
                  //   // position: 'absolute',
                  //   // top: 8,
                  //   // left: (deviceWidth - 60) / 2,
                  //   zIndex: 10,
                  //   // height: 3,
                  //   borderRadius: 1.5,
                  //   backgroundColor: '#ccc',
                  // }}
                />

                <Text style={[styles.closeIcon, {fontSize:normalize(12)}]} onPress={() => updateleee() }>
                  Back
                </Text>
              </View>
            </PanGestureHandler>

            <ScrollView 

ref={scrollRef}
>
              <View style={styles.myinfocontainer}>
                {props.logindata.isLoggedIn == true ? (
                  <>
                    <View style={styles.pfcontainer}>
                    {
             checkifexists == '1' ? 
                <Image
              style={styles.pfstyle2image}
             
              source={{uri:'https://echoes.agency/files/'+ props.logindata.userData.email+'.png' }}
            />
             :
             <Image
              style={styles.pfstyle2image}
             
              source={require('../../assets/defaultpf.png')}
            />

           }
                    </View>

                    <Text style={{alignSelf: 'center',color:"black", fontSize:normalize(12), marginBottom: '2%'}}>
                      {props.logindata.userData.username}
                    </Text>

                    <Myinformation
                      nametitle="My Information"
                      border1="20"
                      border2="20"
                      border3="20"
                      border4="20"></Myinformation>
                  </>
                ) : (
                  <></>
                )}


{
  props.logindata.isLoggedIn == true ? null :
  <>
    <List.Item onPress={() =>  navigation.navigate('Login',{yess:"0"})}
                  style={{
                    backgroundColor: '#093A9E',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,marginTop:15
                  }}
                  title={() => <Text style={{color: 'white'}}>Login</Text>}
                  right={() => (
                      <Icon name="chevron-right" size={16} color="white"  style={{alignSelf:"center",right:10}}
             
/>
                  )}
                />

  <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />

</>
}

                <Text style={[styles.titletext, {fontSize:normalize(12)}]}>General Settings</Text>

                <List.Item
                  style={{
                    backgroundColor: '#093A9E',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                  }}
                  title={() => <Text style={{color: 'white', fontSize:normalize(12)}}>Unit</Text>}
                  right={() => (
                    <CustomSwitch
                      selectionMode={2}
                      roundCorner={true}
                      option1={'Kilometers'}
                      option2={'Miles'}
                      onSelectSwitch={onSelectSwitch}
                      selectionColor={'#093A9E'}
                    />
                  )}
                />

                <Text style={[styles.titletext, {fontSize:normalize(12)}]}>Contact Us</Text>
                <List.Item onPress={() =>   OpenAnything.Call('+9611999966')}
                  style={{
                    backgroundColor: '#093A9E',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  title={() => <Text style={{color: 'white', fontSize:normalize(12)}}>Call Us</Text>}
                  right={() => (
                      <Icon name="chevron-right" size={normalize(12)} color="white"  style={{alignSelf:"center",right:10}}
             
/>
                  )}
                />

  <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />

 <List.Item onPress={() =>   OpenAnything.Email("info@metropolitansecurity.com.lb")}
                  style={{
                    backgroundColor: '#093A9E',
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  title={() => <Text style={{color: 'white', fontSize:normalize(12)}}>Email</Text>}
                  right={() => (
                      <Icon name="chevron-right" size={normalize(12)} color="white"  style={{alignSelf:"center",right:10}}
             
/>
                  )}
                />

  <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />

 <List.Item onPress={() =>   OpenAnything.Web('https://metropolitansecurity.com.lb/new/')} 
                  style={{
                    backgroundColor: '#093A9E',
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  title={() => <Text style={{color: 'white', fontSize:normalize(12)}}>Visit Our Website</Text>}
                  right={() => (
                      <Icon name="chevron-right" size={normalize(12)} color="white"  style={{alignSelf:"center",right:10}}
             
/>
                  )}
                />
                <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />
                <Myinformation
                  nametitle="Visit Our Office"
                  border1="0"
                  border2="0"
                  border3="20"
                  border4="20"></Myinformation>
               <Text style={[styles.titletext, {fontSize:normalize(12)}]}>About Us</Text>

                <Myinformation
                  nametitle="Message From Our CEO"
                  border1="20"
                  border2="20"
                  border3="0"
                  border4="0"></Myinformation>
                <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />
                <Myinformation
                  nametitle="Who We Are"
                  border1="0"
                  border2="0"
                  border3="0"
                  border4="0"></Myinformation>
                <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />
                <Myinformation
                  nametitle="Our Services"
                  border1="0"
                  border2="0"
                  border3="0"
                  border4="0"></Myinformation>
                <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />
                <Myinformation
                  nametitle="ISO & ICoCA Affiliate"
                  border1="0"
                  border2="0"
                  border3="20"
                  border4="20"></Myinformation>

<Text style={[styles.titletext, {fontSize:normalize(12)}]}>About Lebanon</Text>
                <Myinformation
                  nametitle="Lebanon Facts and Figures"
                  border1="20"
                  border2="20"
                  border3="0"
                  border4="0"></Myinformation>
                <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />
                <Myinformation
                  nametitle="Considerations Before Departure"
                  border1="0"
                  border2="0"
                  border3="0"
                  border4="0"></Myinformation>
                <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />

                <Myinformation
                  nametitle="Checklist Before Departure"
                  border1="0"
                  border2="0"
                  border3="20"
                  border4="20"></Myinformation>

<Text style={[styles.titletext, {fontSize:normalize(12)}]}>Security Situation</Text>

                <Myinformation
                  nametitle="Security Situation"
                  border1="20"
                  border2="20"
                  border3="0"
                  border4="0"></Myinformation>
                <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                />

                <Myinformation
                  nametitle="Security Forces"
                  border1="0"
                  border2="0"
                  border3="20"
                  border4="20"></Myinformation>

<Text style={[styles.titletext, {fontSize:normalize(12)}]}>National Risk</Text>
                {/* <Myinformation
                  nametitle="National Risk Assessment"
                  border1="20"
                  border2="20"
                  border3="0"
                  border4="0"></Myinformation>
                <View
                  style={{
                    height: 1,
                    width: '92%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '4%',
                  }}
                /> */}

                <Myinformation
                  nametitle="National Risk Zone Map"
                  border1="20"
                  border2="20"
                  border3="20"
                  border4="20"></Myinformation>

                {props.logindata.isLoggedIn == true ? (
                  <>
                   <Text style={[styles.titletext, {fontSize:normalize(12)}]}>Logout</Text>

                    <List.Item
                      key={props.nametitle}
                      style={{
                        backgroundColor: '#093A9E',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}
                      onPress={() => {
                        props.dologout(), navigation.navigate('Login',{yess:"0"});
                      }}
                      title={() => (
                        <Text style={{color: 'white', fontSize:normalize(12)}}>Log out</Text>
                      )}
                      right={() => (
                        <Icon
                          name="chevron-right"
                          size={normalize(12)}
                          color="white"
                          style={{alignSelf: 'center', right: 10}}
                        />
                      )}
                    />
                  </>
                ) : null}
              </View>
              
              {console.log("GY", normalize(12))}

              <Text>{'\n'}</Text>
              <Text style={{textAlign:"center",color:"black",fontWeight:"bold", fontSize:normalize(12)}}>on</Text>
              
<View style={styles.followus}>
  <TouchableOpacity  onPress={() =>   OpenAnything.Web('https://www.facebook.com/metropolitansal/')}>
<LinearGradient colors={['#093A9E' , '#093A9E']} style={{ width: normalize(20), height: normalize(20),padding:5 ,
                    borderRadius: normalize(20),justifyContent: "center"}}>

<FontAwesome name="facebook" size={normalize(12)} color="white" style={{alignSelf:"center"}}/>
           </LinearGradient>
           </TouchableOpacity>

           <TouchableOpacity style={{marginLeft:'5%'}}  onPress={() =>   OpenAnything.Web('https://www.instagram.com/metropolitan_security_sal/?hl=en')}>
           <LinearGradient colors={['#093A9E' , '#093A9E']} style={{ width: normalize(20), height: normalize(20),padding:5 ,
                    borderRadius: normalize(20),justifyContent: "center"}}>

<FontAwesome name="instagram" size={normalize(12)} color="white" style={{alignSelf:"center"}}/>
           </LinearGradient></TouchableOpacity>


           <TouchableOpacity style={{marginLeft:'5%'}}  onPress={() =>   OpenAnything.Web('https://lb.linkedin.com/in/metropolitan-security-9b3ba972?original_referer=https%3A%2F%2Fwww.google.com%2F')}>
           <LinearGradient colors={['#093A9E' , '#093A9E']} style={{ width: normalize(20), height: normalize(20),padding:5 ,
                    borderRadius: normalize(20),justifyContent: "center"}}>

<FontAwesome name="linkedin" size={normalize(12)} color="white" style={{alignSelf:"center"}}/>
           </LinearGradient></TouchableOpacity>

           <TouchableOpacity style={{marginLeft:'5%'}}  onPress={() =>   OpenAnything.Web('https://twitter.com/metropolitan6')}>
           <LinearGradient colors={['#093A9E' , '#093A9E']} style={{ width: normalize(20), height: normalize(20),padding:5 ,
                    borderRadius: normalize(20),justifyContent: "center"}}>

<FontAwesome name="twitter" size={normalize(12)} color="white" style={{alignSelf:"center"}}/>
           </LinearGradient></TouchableOpacity>

</View>
              <Text>{'\n'}</Text>

              <Text style={{textAlign: 'center',color:"black", fontSize:normalize(12)}}>Developed by</Text>

              <TouchableOpacity onPress={() =>   OpenAnything.Web('https://digitalechoes.net/')} >
              <Image 
                source={require('../../assets/logo2.png')}
                style={{width: normalize(20), height: normalize(20), alignSelf: 'center'}}
              />
              </TouchableOpacity>
            </ScrollView>

            <Text>{'\n'}</Text>
          </Animated.View>
        </Portal>
      </SafeAreaView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setKilometers: () => dispatch(setKilometers()),
  setMiles: () => dispatch(setMiles()),
  dologout: () => dispatch(logout()),
});

const mapStateToProps = state => {
  return {
    logindata: state.loginreducer,
    distanceData: state.DistanceReducer.distance,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomSheet);
const styles = StyleSheet.create({
  buttonn: {
    position: 'relative',
  },
  viewbutton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center'
  },
  textbutton: {
    justifyContent: 'center',
    fontSize: 15,
  
    color:"black",alignSelf:"center",width:'90%'
   
  },

  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      height: -3,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    // height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: '2%'
  },
  common: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,

    elevation: 3,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    textAlign: 'center'
  },
  myinfocontainer: {
    width: wp('90%'),

    height: 'auto',
    alignSelf: 'center',
    borderRadius: 15,
  },
  pfstyle: {
    flex: 1,
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 150,
  },

  pfstyle2: {
    flex: 1,
    width: '10%',
    height:'100%',
    resizeMode: 'contain',
    alignSelf: 'flex-end'},

  pfstyle2image: {
    flex: 1,
    width: 120,
    height:40,
   
    borderRadius: 180,

    alignSelf: 'center',
  },
  pfstyle2imagedefault: {
    flex: 1,
    width: '100%',
    height:'100%',
   
    borderRadius: 180,

    alignSelf: 'center',resizeMode:"contain"
  },
  pfstyle2imageee: {
    flex: 1,
    width: '75%',
    height:'100%',
    resizeMode: 'cover',

    borderRadius: 250,

    alignSelf: 'center',
  },

  pfcontainer: {
    width: wp('30%'),
    height: hp('20%'),

    alignSelf: 'center',
    padding: hp('2%'),
    justifyContent: 'center'
  },
  titletext: {
    marginVertical: '3%',
    fontSize: 18,
    color: 'black',
  },

  followus:{
    width:'90%',
    alignSelf:"center"
    ,
    justifyContent:"center",
    display:"flex",
    flexDirection:"row",
    height:50,marginTop:'2%'
 
  }
});
