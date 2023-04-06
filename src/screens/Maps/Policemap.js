import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  PixelRatio,
  Dimensions,
  SafeAreaView,
  Linking,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import paper from 'react-native-animatable';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useSelector, useDispatch} from 'react-redux';
import {getCities} from '../../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import getDirections from 'react-native-google-maps-directions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Policemap({navigation, route}) {
  const navigationscreen = useNavigation();

  const [tracksViewChanges, setTracksViewChanges] = useState(true);
  const [markerDirections, setMarkerDirections] = useState(false);
  const [latitudee, setLatitudee] = useState(route.params.latitude);
  const [longitudee, setLongitudee] = useState(route.params.longitude);
  const [markerLat, setMarkerLat] = useState(latitudee);
  const [markerLong, setMarkerLong] = useState(longitudee);
  const [markerLabel, setMarkerLabel] = useState('');

  const stopTrackingViewChanges = () => {
    setTracksViewChanges(false);
  };
  function handleGetDirections(lattt, longgg) {
    const data = {
      destination: {
        latitude: lattt,
        longitude: longgg,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
    };
    getDirections(data);
  }

  const showAlert = () =>
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

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

  const policeData = [
    {
      name: 'Bint Jbeil Police Station',
      number: '+961 7 450 032',
      latitude: 33.1182794,
      longitude: 35.4346158,
    },
    {
      name: 'Sour Police Station',
      number: '+961 7 349 358',
      latitude: 33.2719693,
      longitude: 35.1977579,
    },
    {
      name: 'Nabatieh Police Station',
      number: '+961 7 531 208',
      latitude: 33.3793473,
      longitude: 35.4831638,
    },
    {
      name: 'Hasbaya Police Station',
      number: '+961 7 550 152',
      latitude: 33.3952078,
      longitude: 35.683852,
    },
    {
      name: 'Saida Police Station',
      number: '+961 7 720 032',
      latitude: 33.5573829,
      longitude: 35.3731932,
    },
    {
      name: 'Jezzine Police Station',
      number: '+961 7 780 002',
      latitude: 33.5406219,
      longitude: 35.5869465,
    },
    {
      name: 'Rachaya Police Station',
      number: '+961 8 590 002',
      latitude: 33.4988596,
      longitude: 35.8479495,
    },
    {
      name: 'Joub Jannine Police Station',
      number: '+961 8 660 881',
      latitude: 33.6271345,
      longitude: 35.7846038,
    },
    {
      name: 'Beitedine Police Station',
      number: '+961 5 507 534',
      latitude: 33.6954805,
      longitude: 35.5824594,
    },
    {
      name: 'Beirut-ISF HQ',
      number: '+961 1 423 056',
      latitude: 33.8810373,
      longitude: 35.5172867,
    },
    {
      name: 'Beirut-Sodeco Police Station',
      number: '112',
      latitude: 33.8841308,
      longitude: 35.510889,
    },
    {
      name: 'Beirut-Basta Police Station',
      number: '112',
      latitude: 33.8858898,
      longitude: 35.5040977,
    },
    {
      name: 'Beirut-Verdun Police Station',
      number: '112',
      latitude: 33.8896661,
      longitude: 35.4838255,
    },
    {
      name: 'Beirut-Gemmayze Police Station',
      number: '112',
      latitude: 33.8950653,
      longitude: 35.5123374,
    },
    {
      name: 'Beirut-Wadi Abou Jamiel Police Station',
      number: '112',
      latitude: 33.8970111,
      longitude: 35.4985602,
    },
    {
      name: 'Beirut-Hamra Police Station',
      number: '112',
      latitude: 33.8949651,
      longitude: 35.4878971,
    },
    {
      name: 'Beirut-Hbeish Police Station',
      number: '112',
      latitude: 33.8985095,
      longitude: 35.4772675,
    },
    {
      name: 'Bikfaya Police Station',
      number: '+961 4 986 159',
      latitude: 33.9224914,
      longitude: 35.6834465,
    },
    {
      name: 'Jounieh Police Station',
      number: '+961 9 635 530',
      latitude: 33.9710608,
      longitude: 35.6195884,
    },
    {
      name: 'Byblos Police Station',
      number: '+961 9 541 142',
      latitude: 34.121346,
      longitude: 35.6496742,
    },
    {
      name: 'Bcharre Police Station',
      number: '+961 6 671 001',
      latitude: 34.2508289,
      longitude: 36.005201,
    },
    {
      name: 'Amioun Police Station',
      number: '+961 6 950 029',
      latitude: 34.2985411,
      longitude: 35.8163404,
    },
    {
      name: 'Tripoli Police Station',
      number: '+961 6 423 056',
      latitude: 34.4301874,
      longitude: 35.8438197,
    },
    {
      name: 'Zgharta Police Station',
      number: '+961 6 666 506',
      latitude: 34.3917084,
      longitude: 35.897252,
    },
    {
      name: 'Denniyeh Police Station',
      number: '+961 6 490 301',
      latitude: 34.3876689,
      longitude: 36.0286078,
    },
    {
      name: 'Hermel Police Station',
      number: '+961 8 200 402',
      latitude: 34.3932356,
      longitude: 36.3905263,
    },
    {
      name: 'Halba Police Station',
      number: '+961 6 692 048',
      latitude: 34.5410134,
      longitude: 36.0770378,
    },
    {
      name: 'Baalbeck Police Station',
      number: '+961 8 370 007',
      latitude: 34.0029801,
      longitude: 36.2094227,
    },
  ];

  const GOOGLE_MAPS_APIKEY = 'AIzaSyCrYvbk8juHM0IxdHqYd5WxMV5oOIkW1p0';

  return (
    <>
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
          onPress={() => navigationscreen.navigate('Profile')}>
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
          Police Stations
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
          onPress={() => navigationscreen.navigate('Profile')}>
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
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
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
          {policeData.map((item, index) => {
            return (
              <>
                <MapViewDirections
                  origin={{
                    latitude: parseFloat(route.params.latitude),
                    longitude: parseFloat(route.params.longitude),
                  }}
                  destination={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="#082D7B"
                />
                <Marker
                  tracksViewChanges={tracksViewChanges}
                  onCalloutPress={() =>
                    handleGetDirections(item.latitude, item.longitude)
                  }
                  onPress={() => {
                    setMarkerDirections(true),
                      setMarkerLat(parseFloat(item.latitude)),
                      setMarkerLong(parseFloat(item.longitude)),
                      setMarkerLabel(item.name);
                  }}
                  style={{width: normalize(20), height: normalize(20)}}
                  coordinate={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                  }}>
                  <Image
                    onLoad={stopTrackingViewChanges}
                    fadeDuration={0}
                    source={require('../../assets/policemarker.png')}
                    style={{width: normalize(20), height: normalize(20)}}
                  />
                  <Callout>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.name}>{item.number}</Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              </>
            );
          })}
        </MapView>
        <TouchableOpacity
          onPress={() => onDirectionButton(markerLat, markerLong, markerLabel)}
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
    width: 180,
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
    fontSize: 14,
    color: 'black',
  },
  // Character image
  image: {
    width: '100%',
    height: 80,
  },
});
