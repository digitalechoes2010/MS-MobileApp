import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  BackHandler,
  Alert,
  Easing,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  PixelRatio,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Alerts from './Alerts.js';
import {useNavigation} from '@react-navigation/native';
import Buttonns from './Buttons';
import Panic from './Panicbutton';
import {connect} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import Foundation from 'react-native-vector-icons/Foundation';
import Geolocation from 'react-native-geolocation-service';

function index(props) {
  const navigationscreen = useNavigation();
  const [overlayvisible, setOverlayvisible] = useState(false);
  const [latitudee, setLatitudee] = useState(33.88863);
  const [longitudee, setLongitudee] = useState(35.49548);
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 320;

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          // do something if granted...
          Geolocation.getCurrentPosition(
            position => {
              setOverlayvisible(true);
              const latitudes = position.coords.latitude;
              const longitudes = position.coords.longitude;
              setLatitudee(latitudes);
              setLongitudee(longitudes);
              setOverlayvisible(false);
            },
            error => {},
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      }

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (PermissionsAndroid.RESULTS.GRANTED === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setOverlayvisible(true);
              const latitudes = position.coords.latitude;
              const longitudes = position.coords.longitude;
              setLatitudee(latitudes);
              setLongitudee(longitudes);
              setOverlayvisible(false);
            },
            error => {},
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      }
    }
    requestPermissions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused/mount
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        // Do something when the screen is unfocused/unmount
        // Useful for cleanup functions

        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []),
  );

  const handleBackButtonClick = () => {
    if (props.logindata.isLoggedIn == true) {
      BackHandler.exitApp();
    } else {
      navigationscreen.navigate('Login', {yess: '0'});
    }

    return true;
  };

  function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  return (
    <>
      <View style={styles.containerhomeelements}>
        <View style={styles.containmaps}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() =>
                navigationscreen.navigate('Nationalmap', {
                  longitude: longitudee,
                  latitude: latitudee,
                })
              }>
              <Animatable.View
                animation="fadeInLeft"
                easing={Easing.linear}
                delay={1000}
                useNativeDriver={true}
                style={styles.containmapinfo}>
                <View
                  style={{
                    width: normalize(24),
                    height: normalize(24),
                    borderRadius: normalize(24),
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: '#a80505',
                  }}>
                  <View
                    style={{
                      width: normalize(20),
                      height: normalize(20),
                      borderRadius: normalize(20),
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      borderWidth: 2,
                      borderColor: '#ffffff',
                    }}>
                    <Foundation
                      name="alert"
                      size={normalize(12)}
                      color="white"
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                </View>
                <Text style={[styles.maptext, {fontSize: normalize(12)}]}>
                  National{'\n'}Risk
                </Text>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigationscreen.navigate('Hospitalmap', {
                  longitude: longitudee,
                  latitude: latitudee,
                })
              }>
              <Animatable.View
                animation="fadeInLeft"
                easing={Easing.linear}
                useNativeDriver={true}
                style={styles.containmapinfo}>
                <View
                  style={{
                    width: normalize(24),
                    height: normalize(24),
                    borderRadius: normalize(24),
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: '#f90d0d',
                  }}>
                  <View
                    style={{
                      width: normalize(20),
                      height: normalize(20),
                      borderRadius: normalize(20),
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      borderWidth: 2,
                      borderColor: '#ffffff',
                    }}>
                    <Foundation
                      name="plus"
                      size={normalize(12)}
                      color="white"
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                </View>
                <Text style={[styles.maptext, {fontSize: normalize(12)}]}>
                  Hospitals
                </Text>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigationscreen.navigate('Embassiesmap', {
                  longitude: longitudee,
                  latitude: latitudee,
                })
              }>
              <Animatable.View
                animation="fadeInRight"
                easing={Easing.linear}
                useNativeDriver={true}
                style={styles.containmapinfo}>
                <View
                  style={{
                    width: normalize(24),
                    height: normalize(24),
                    borderRadius: normalize(24),
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: '#78a3ef',
                  }}>
                  <View
                    style={{
                      width: normalize(20),
                      height: normalize(20),
                      borderRadius: normalize(20),
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      borderWidth: 2,
                      borderColor: '#ffffff',
                    }}>
                    <Foundation
                      name="flag"
                      size={normalize(12)}
                      color="white"
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                </View>
                <Text style={[styles.maptext, {fontSize: normalize(12)}]}>
                  Embassies
                </Text>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigationscreen.navigate('Policemap', {
                  longitude: longitudee,
                  latitude: latitudee,
                })
              }>
              <Animatable.View
                animation="fadeInRight"
                easing={Easing.linear}
                delay={1000}
                useNativeDriver={true}
                style={styles.containmapinfo}>
                <View
                  style={{
                    width: normalize(24),
                    height: normalize(24),
                    borderRadius: normalize(24),
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: '#11366d',
                  }}>
                  <View
                    style={{
                      width: normalize(20),
                      height: normalize(20),
                      borderRadius: normalize(20),
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      borderWidth: 2,
                      borderColor: '#ffffff',
                    }}>
                    <Foundation
                      name="flag"
                      size={normalize(12)}
                      color="white"
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                </View>
                <Text style={[styles.maptext, {fontSize: normalize(12)}]}>
                  Police{'\n'}Stations
                </Text>
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </View>

        <Alerts
          longitude={props.longitude}
          latitude={props.latitude}
          unit={props.unit}
          division={props.division}></Alerts>

        <View style={styles.containbuttons}>
          <SafeAreaView>
            <Animatable.View
              animation="fadeInLeft"
              useNativeDriver={true}
              style={styles.aboutbutton}>
              <TouchableOpacity
                onPress={() => props.updateab()}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/guide.png')}
                  style={{width: 45, height: 45}}
                />
                <Text
                  style={{
                    color: '#a8a8a8',
                    marginLeft: '6%',
                    textAlign: 'center',
                    fontSize: normalize(12),
                  }}>
                  Members{'\n'}Guide
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </SafeAreaView>

          <Animatable.View
            animation="fadeInRight"
            useNativeDriver={true}
            style={styles.emergencybutton}>
            <TouchableOpacity
              onPress={() => navigationscreen.navigate('Emergency')}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/mobile.png')}
                style={{width: 26, height: 47}}
              />
              <Text
                style={{
                  color: '#a8a8a8',
                  marginLeft: '6%',
                  textAlign: 'center',
                  fontSize: normalize(12),
                }}>
                Emergency{'\n'}Numbers
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {props.logindata.isLoggedIn == true ? (
          <Panic
            unit={props.unit}
            division={props.division}
            name={props.logindata.userData.username}></Panic>
        ) : (
          <Panic unit={props.unit} division={props.division} name=""></Panic>
        )}
      </View>
    </>
  );
}
const mapStateToProps = state => {
  return {
    logindata: state.loginreducer,
  };
};

export default connect(mapStateToProps, null)(index);

const styles = StyleSheet.create({
  containerhomeelements: {
    // flex:1,

    alignContent: 'center',
    alignItems: 'center',
    // paddingVertical:'2%',
    paddingHorizontal: '4%',
  },
  aboutbutton: {
    height: hp('10%'),
    width: wp('44%'),
    backgroundColor: '#F9F9F9',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#536A9B',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  containbuttons: {
    height: hp('15%'),
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emergencybutton: {
    height: hp('10%'),
    justifyContent: 'center',
    width: wp('44%'),
    backgroundColor: '#F9F9F9',
    borderRadius: 7,
    // marginLeft:wp('4%'),
    alignItems: 'center',
    shadowColor: '#536A9B',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },

  containmaps: {
    marginTop: Platform.OS === 'ios' ? '1%' : 0,
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  containmapinfo: {
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemap: {
    height: 32,
    width: 32,
    alignSelf: 'center',
  },
  maptext: {
    alignSelf: 'center',
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});
