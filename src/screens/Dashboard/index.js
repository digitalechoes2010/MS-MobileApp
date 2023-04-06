import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  PermissionsAndroid,
  Platform,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useSelector, useDispatch} from 'react-redux';
import {getCities} from '../../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Geolocation from 'react-native-geolocation-service';

import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import moment from 'moment';

export default function Dashboard({navigation, route}) {
  const navigationscreen = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const {cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [latitudee, setLatitudee] = useState(route.params.userLat);
  const [longitudee, setLongitudee] = useState(route.params.userLong);
  const [overlayvisible, setOverlayvisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerDirections, setMarkerDirections] = useState(false);
  const [markerLat, setMarkerLat] = useState(latitudee);
  const [markerLong, setMarkerLong] = useState(longitudee);
  const [markerLabel, setMarkerLabel] = useState('');

  useEffect(() => {
    dispatch(getCities());

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    if (
      date == 1 ||
      date == 2 ||
      date == 3 ||
      date == 4 ||
      date == 5 ||
      date == 6 ||
      date == 7 ||
      date == 8 ||
      date == 9
    ) {
      date = '0' + date;
    }

    if (
      min == 1 ||
      min == 2 ||
      min == 3 ||
      min == 4 ||
      min == 5 ||
      min == 6 ||
      min == 7 ||
      min == 8 ||
      min == 9
    ) {
      min = '0' + min;
    }
    if (
      month == 1 ||
      month == 2 ||
      month == 3 ||
      month == 4 ||
      month == 5 ||
      month == 6 ||
      month == 7 ||
      month == 8 ||
      month == 9
    ) {
      month = '0' + month;
    }
    if (
      hours == 1 ||
      hours == 2 ||
      hours == 3 ||
      hours == 4 ||
      hours == 5 ||
      hours == 6 ||
      hours == 7 ||
      hours == 8 ||
      hours == 9
    ) {
      hours = '0' + hours;
    }

    if (hours == 0) {
      hours = '0' + hours;
    }
    if (min == 0) {
      min = '0' + min;
    }
    setCurrentDate(year + '-' + month + '-' + date + ' ' + hours + ':' + min);
  }, []);

  const doclosefunction = () => {
    setModalVisible(!modalVisible);
    setTimeout(() => {
      navigationscreen.navigate('Login', {yess: '0'});
    }, 1000);
  };

  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 320;

  function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  function onDirectionButton(latitude, longitude, label) {
    const lat = latitude;
    const lng = longitude;
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const customLabel = label;
    const url = Platform.select({
      ios: `${scheme}${customLabel}@${latLng}`,
      android: `${scheme}${latLng}(${customLabel})`,
    });

    Linking.openURL(url);
  }

  const GOOGLE_MAPS_APIKEY = 'AIzaSyCrYvbk8juHM0IxdHqYd5WxMV5oOIkW1p0';

  return (
    <>
      <>
        <Modal
          isVisible={modalVisible}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <Pressable
            style={styles.centeredView}
            onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalView}>
              <Image
                source={require('../../assets/alert4.png')}
                style={{width: 80, height: 73}}
              />
              <Text style={[styles.modalText, {fontSize: normalize(12)}]}>
                Please login to see the info
              </Text>
              <Text style={styles.buttonnn} onPress={doclosefunction}>
                Login
              </Text>
              <Text
                style={styles.buttonnn}
                onPress={() => setModalVisible(!modalVisible)}>
                Cancel
              </Text>
            </View>
          </Pressable>
        </Modal>

        {/* <View
      style={{
        justifyContent: 'center',
        height: Platform.OS === 'ios' ? 70 : 50,
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1,
      }}>
      <View
        style={{
          borderRadius: 20,
          padding: 5,
          marginLeft: '3%',
          backgroundColor: '#082D7B',
          alignContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          left: 0,
          display: 'flex',
          flexDirection: 'row',top:Platform.OS === 'ios' ? 40 : 10
        }}>
        <Icon
          name="chevron-left"
          size={14}
          color="white"
          style={{justifyContent: 'center', alignSelf: 'center'}}
        /> */}

        {route.params.count == 0 ? (
          <SafeAreaView
            style={{
              justifyContent: 'space-between',
              backgroundColor: 'white',
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 1,
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: '#082D7B',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: '2%',
                marginVertical: '2%',
                marginLeft: '2%',
              }}
              onPress={() =>
                navigationscreen.navigate('Profile', {
                  unit: route.params.unit,
                  division: route.params.division,
                })
              }>
              <Icon
                name="chevron-left"
                size={normalize(8)}
                color="white"
                style={{justifyContent: 'center', alignSelf: 'center'}}
              />
              <Text
                style={{
                  fontSize: normalize(12),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: 'white',
                  marginLeft: '1%',
                }}>
                Dashboard
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize: normalize(12), marginVertical: '2%'}}>
              Alerts
            </Text>

            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: '2%',
                marginVertical: '2%',
                marginRight: '2%',
              }}
              onPress={() =>
                navigationscreen.navigate('Profile', {
                  unit: route.params.unit,
                  division: route.params.division,
                })
              }>
              <Icon
                name="chevron-left"
                size={normalize(8)}
                color="white"
                style={{justifyContent: 'center', alignSelf: 'center'}}
              />
              <Text
                style={{
                  fontSize: normalize(12),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: 'white',
                  marginLeft: '1%',
                }}>
                Dashboard
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        ) : (
          <SafeAreaView
            style={{
              justifyContent: 'space-between',
              backgroundColor: 'white',
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 1,
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: '#082D7B',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: '2%',
                marginVertical: '2%',
                marginLeft: '2%',
              }}
              onPress={() =>
                navigationscreen.navigate('Alerts', {
                  unit: route.params.unit,
                  division: route.params.division,
                })
              }>
              <Icon
                name="chevron-left"
                size={normalize(8)}
                color="white"
                style={{justifyContent: 'center', alignSelf: 'center'}}
              />
              <Text
                style={{
                  fontSize: normalize(12),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: 'white',
                  marginLeft: '1%',
                }}>
                All Alerts
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize: normalize(12), marginVertical: '2%'}}>
              Alerts
            </Text>

            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: '2%',
                marginVertical: '2%',
                marginRight: '2%',
              }}
              onPress={() =>
                navigationscreen.navigate('Alerts', {
                  unit: route.params.unit,
                  division: route.params.division,
                })
              }>
              <Icon
                name="chevron-left"
                size={normalize(8)}
                color="white"
                style={{justifyContent: 'center', alignSelf: 'center'}}
              />
              <Text
                style={{
                  fontSize: normalize(12),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: 'white',
                  marginLeft: '1%',
                }}>
                All Alerts
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            toolbarEnabled={false}
            region={{
              latitude: parseFloat(markerLat),
              longitude: parseFloat(markerLong),
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}>
            <Marker
              title="My Location"
              onPress={() => {
                setMarkerDirections(false),
                  setMarkerLat(parseFloat(latitudee)),
                  setMarkerLong(parseFloat(longitudee));
              }}
              coordinate={{
                latitude: parseFloat(latitudee),
                longitude: parseFloat(longitudee),
              }}
            />

            {cities.map(news =>
              moment(currentDate).diff(moment(news.datetime), 'hours') <= 48 ? (
                <>
                  <MapViewDirections
                    origin={{
                      latitude: parseFloat(latitudee),
                      longitude: parseFloat(longitudee),
                    }}
                    destination={{
                      latitude: parseFloat(news.latitude),
                      longitude: parseFloat(news.longitude),
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="#082D7B"
                  />
                  <Marker
                    onCalloutPress={() =>
                      route.params.isloggedd == false
                        ? setModalVisible(true)
                        : navigation.navigate('Detail', {
                            itemId: news.id,
                            date: news.datetime,
                            title: news.title,
                            longitude: news.longitude,
                            latitude: news.latitude,
                            statenews: news.statenews,
                            description: news.description,
                            location: news.location,
                            count: 2,
                          })
                    }
                    onPress={() => {
                      setMarkerDirections(true),
                        setMarkerLat(parseFloat(news.latitude)),
                        setMarkerLong(parseFloat(news.longitude)),
                        setMarkerLabel(news.title);
                    }}
                    style={{width: normalize(20), height: normalize(20)}}
                    key={news.id}
                    coordinate={{
                      latitude: parseFloat(news.latitude),
                      longitude: parseFloat(news.longitude),
                    }}
                    description={news.description}
                    title={news.title}>
                    <Image
                      source={
                        news.statenews == 'Shootings'
                          ? require('../../assets/alert1.png')
                          : news.statenews == 'RoadBlocks'
                          ? require('../../assets/alert2.png')
                          : news.statenews == 'Protests'
                          ? require('../../assets/alert3.png')
                          : news.statenews == 'StateOfAlert'
                          ? require('../../assets/alert4.png')
                          : news.statenews == 'Grenade'
                          ? require('../../assets/alert5.png')
                          : news.statenews == 'StateOfEmergency'
                          ? require('../../assets/alert6.png')
                          : require('../../assets/alert1.png')
                      }
                      style={{width: normalize(20), height: normalize(20)}}
                      resizeMode="contain"
                    />

                    <Callout
                      style={{flex: -1, position: 'absolute', width: 300}}>
                      <Text style={styles.name}>{news.title}</Text>
                    </Callout>
                  </Marker>
                </>
              ) : null,
            )}
          </MapView>
          <TouchableOpacity
            onPress={() =>
              onDirectionButton(markerLat, markerLong, markerLabel)
            }
            style={{
              bottom: '5%',
              right: '5%',
              position: 'absolute',
              zIndex: 1,
              backgroundColor: 'white',
              padding: '2%',
              alignItems: 'center',
              justifyContent: 'center',
              display: markerDirections === true ? 'flex' : 'none',
            }}>
            <FontAwesome5
              name="directions"
              size={normalize(20)}
              color="#082D7B"
            />
          </TouchableOpacity>
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    color: 'black',
  },
  // Character image
  image: {
    width: '100%',
    height: 80,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonnn: {
    fontSize: 20,
    color: 'white',
    width: 100,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#1F3E80',
    padding: 8,
    textAlign: 'center',
  },
});
