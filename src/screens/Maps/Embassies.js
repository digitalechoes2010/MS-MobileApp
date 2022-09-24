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

export default function Embassiesmap({navigation, route}) {
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

  const embassiesData = [
    {
      name: 'Embassy of Jordan',
      number: '+961 5 922 501',
      latitude: 33.8304306,
      longitude: 35.5415615,
    },
    {
      name: 'Embassy of Poland',
      number: '+961 5 928 881',
      latitude: 33.8307603,
      longitude: 35.546191,
    },
    {
      name: 'Embassy of Ukraine',
      number: '+961 5 921 957',
      latitude: 33.8321283,
      longitude: 35.5504397,
    },
    {
      name: 'Embassy of The Czech Republic',
      number: '+961 5 929 010',
      latitude: 33.8343452,
      longitude: 35.5393702,
    },
    {
      name: 'Embassy of Korea',
      number: '+961 5 953 167',
      latitude: 33.8400197,
      longitude: 35.5472156,
    },
    {
      name: 'Embassy of Spain',
      number: '+961 5 464 120',
      latitude: 33.8418888,
      longitude: 35.5338448,
    },
    {
      name: 'Embassy of The Philippines',
      number: '+961 1 212 001',
      latitude: 33.8428913,
      longitude: 35.534392,
    },
    {
      name: 'Embassy of Romania',
      number: '+961 5 924 848',
      latitude: 33.8443463,
      longitude: 35.5392373,
    },
    {
      name: 'Embassy of Indonesia',
      number: '+961 5 924 676',
      latitude: 33.8451883,
      longitude: 35.5417961,
    },
    {
      name: 'Embassy of Italy',
      number: '+961 5 954 955',
      latitude: 33.8453799,
      longitude: 35.5387867,
    },
    {
      name: 'Embassy of Tunisia',
      number: '+961 71 960 420',
      latitude: 33.8572935,
      longitude: 35.5442005,
    },
    {
      name: 'Embassy of Bulgaria',
      number: '+961 5 452 883',
      latitude: 33.8583403,
      longitude: 35.5443077,
    },
    {
      name: 'Embassy of Thailand',
      number: '+961 5 951 708',
      latitude: 33.8595787,
      longitude: 35.5425804,
    },
    {
      name: 'Embassy of Iran',
      number: '+961 1 821 230',
      latitude: 33.855916,
      longitude: 35.489288,
    },
    {
      name: 'Embassy of Kuwait',
      number: '+961 1 822 515',
      latitude: 33.8597117,
      longitude: 35.4943264,
    },
    {
      name: 'Embassy of Morroco',
      number: '+961 1 859 851',
      latitude: 33.8586312,
      longitude: 35.4916134,
    },
    {
      name: 'Embassy of Nigeria',
      number: '',
      latitude: 33.8651671,
      longitude: 35.4883599,
    },
    {
      name: 'Embassy of Palestine',
      number: '+961 1 844 993',
      latitude: 33.8663475,
      longitude: 35.4843634,
    },
    {
      name: 'Embassy of Algeria',
      number: '+961 1 826 712',
      latitude: 33.8640423,
      longitude: 35.4832074,
    },
    {
      name: 'Embassy of Egypt',
      number: '+961 1 859 977',
      latitude: 33.87159,
      longitude: 35.4937083,
    },
    {
      name: 'Embassy of China',
      number: '+961 1 850 314',
      latitude: 33.8712426,
      longitude: 35.4895991,
    },
    {
      name: 'Embassy of Oman',
      number: '+961 1 856 555',
      latitude: 33.8716724,
      longitude: 35.4873219,
    },
    {
      name: 'Embassy of United Arab Emirates',
      number: '+961 1 857 000',
      latitude: 33.8715945,
      longitude: 35.4835159,
    },
    {
      name: 'Embassy of Pakistan',
      number: '+961 1 835 453',
      latitude: 33.8733414,
      longitude: 35.4875281,
    },
    {
      name: 'Embassy of Iraq',
      number: '+961 5 453 209',
      latitude: 33.8754159,
      longitude: 35.4837841,
    },
    {
      name: 'Embassy of Russia',
      number: '+961 1 300 041',
      latitude: 33.8806522,
      longitude: 35.49017,
    },
    {
      name: 'Embassy of Qatar',
      number: '+961 1 865 271',
      latitude: 33.8833968,
      longitude: 35.4800721,
    },
    {
      name: 'Embassy of Cuba',
      number: '+961 5 459 925',
      latitude: 33.885383,
      longitude: 35.4802597,
    },
    {
      name: 'Embassy of Finland',
      number: '+961 1 218 861',
      latitude: 33.8886931,
      longitude: 35.4953242,
    },
    {
      name: 'Embassy of Sudan',
      number: '+961 1 353 270',
      latitude: 33.8920304,
      longitude: 35.4829016,
    },
    {
      name: 'Embassy of India',
      number: '+961 1 373 539',
      latitude: 33.8969185,
      longitude: 35.482223,
    },
    {
      name: 'Embassy of Malaysia',
      number: '+961 1 787 144',
      latitude: 33.8935602,
      longitude: 35.4722437,
    },
    {
      name: 'Embassy of Brazil',
      number: '+961 5 921 255',
      latitude: 33.8957372,
      longitude: 35.4999185,
    },
    {
      name: 'Embassy of Belgium',
      number: '+961 1 976 001',
      latitude: 33.8947433,
      longitude: 35.5049145,
    },
    {
      name: 'Embassy of Switzerland',
      number: '+961 1 324 129',
      latitude: 33.8922675,
      longitude: 35.5094796,
    },
    {
      name: 'Embassy of Austria',
      number: '+961 1 217 360',
      latitude: 33.8924389,
      longitude: 35.5121176,
    },
    {
      name: 'Embassy of The Netherlands (Holland)',
      number: '+961 1 204 663',
      latitude: 33.8919245,
      longitude: 35.5143448,
    },
    {
      name: 'Embassy of Argentina',
      number: '+961 1 210 803',
      latitude: 33.89358,
      longitude: 35.5146965,
    },
    {
      name: 'Embassy of Cyprus',
      number: '+961 1 213 063',
      latitude: 33.8921337,
      longitude: 35.5191969,
    },
    {
      name: 'Embassy of Singapore',
      number: '',
      latitude: 33.8923386,
      longitude: 35.5180972,
    },
    {
      name: 'Consulate of Sweden',
      number: '+961 1 485 489',
      latitude: 33.8795455,
      longitude: 35.5336352,
    },
    {
      name: 'Embassy of Canada',
      number: '+961 4 726 700',
      latitude: 33.9093582,
      longitude: 35.5782162,
    },
    {
      name: 'Embassy of Greece',
      number: '+961 4 418 772',
      latitude: 33.9177288,
      longitude: 35.5991723,
    },
    {
      name: 'Embassy of Chile',
      number: '+961 4 418 670',
      latitude: 33.9172413,
      longitude: 35.5981772,
    },
    {
      name: 'Embassy of Turkey',
      number: '+961 4 410 082',
      latitude: 33.9200547,
      longitude: 35.6036758,
    },
    {
      name: 'Embassy of Germany',
      number: '+961 1 504 600',
      latitude: 33.9202283,
      longitude: 35.6168561,
    },
    {
      name: 'Embassy of Armenia',
      number: '+961 4 418 860',
      latitude: 33.9261753,
      longitude: 35.6114032,
    },
    {
      name: 'Embassy of Mexico',
      number: '+961 4 927 354',
      latitude: 33.928837,
      longitude: 35.6253936,
    },
    {
      name: 'Embassy of United States of America',
      number: '+961 4 543 600',
      latitude: 33.9347478,
      longitude: 35.5978393,
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
          Embassies
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
          {embassiesData.map((item, index) => {
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
                    source={require('../../assets/embassymarker.png')}
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

    padding: 5,
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
    fontSize: 13,
    color: 'black',
  },
  // Character image
  image: {
    width: '100%',
    height: 80,
  },
});
