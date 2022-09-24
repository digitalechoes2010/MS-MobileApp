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
  Dimensions,
  PixelRatio,
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

import {isTemplateMiddle} from 'typescript';
import {routerActions} from 'connected-react-router';

export default function Hospitalmap({navigation, route}) {
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

  const hospitalData = [
    {
      name: 'Bint Jbail Governmental Hospital',
      latitude: 33.1274917,
      longitude: 35.4343134,
    },
    {
      name: 'Salah Ghandour',
      latitude: 33.1304881,
      longitude: 35.4298663,
    },
    {
      name: 'Tebnine Governomental Hospital',
      latitude: 33.1967135,
      longitude: 35.4155728,
    },
    {
      name: 'UNIFIL Hospital',
      latitude: 33.1241538,
      longitude: 35.1372212,
    },
    {
      name: 'Lebanese Italian Hospital',
      latitude: 33.2535405,
      longitude: 35.2246451,
    },
    {
      name: 'Sour Red Cross',
      latitude: 33.259269,
      longitude: 35.2132243,
    },
    {
      name: 'Rida Mroue Hospital',
      latitude: 33.2712966,
      longitude: 35.1967582,
    },
    {
      name: 'Jabal Amel Hospital',
      latitude: 33.2782123,
      longitude: 35.2181166,
    },
    {
      name: 'Hiram Hospital',
      latitude: 33.2821252,
      longitude: 35.2229661,
    },
    {
      name: 'Sour Public Hospital',
      latitude: 33.2733934,
      longitude: 35.2133343,
    },
    {
      name: 'Marjeyoun Hospital',
      latitude: 33.3641985,
      longitude: 35.5873415,
    },
    {
      name: 'Hikmat Al-Ameen',
      latitude: 33.3932238,
      longitude: 35.4899156,
    },
    {
      name: 'Fakih Hospital',
      latitude: 33.4344371,
      longitude: 35.2742445,
    },
    {
      name: 'Khroubi Hospital',
      latitude: 33.4521675,
      longitude: 35.2862582,
    },
    {
      name: 'Alaa Eddine',
      latitude: 33.4590913,
      longitude: 35.2891523,
    },
    {
      name: 'Nabatieh Governmental Hospital',
      latitude: 33.3896317,
      longitude: 35.483025,
    },
    {
      name: 'Jezzine Hospital',
      latitude: 33.5370874,
      longitude: 35.5810383,
    },
    {
      name: 'Al-Raei Hospital',
      latitude: 33.5318781,
      longitude: 35.3627414,
    },
    {
      name: 'Hamchari Hospital',
      latitude: 33.5433449,
      longitude: 35.397417,
    },
    {
      name: 'Saida Hospital',
      latitude: 33.545994,
      longitude: 35.3817421,
    },
    {
      name: 'Al-Hamshari Hospital',
      latitude: 33.5478717,
      longitude: 35.3857869,
    },
    {
      name: 'Al-Janoub',
      latitude: 33.5512114,
      longitude: 35.3689346,
    },
    {
      name: 'Complexe Hospitalier du Sud',
      latitude: 33.5534244,
      longitude: 35.3696588,
    },
    {
      name: 'Labib Hospital',
      latitude: 33.5559189,
      longitude: 35.3738806,
    },
    {
      name: "Dalla'a General Hospital",
      latitude: 33.5572578,
      longitude: 35.3776249,
    },
    {
      name: 'Hamoud Hospital University Medical Center',
      latitude: 33.5600562,
      longitude: 35.3753933,
    },
    {
      name: 'Abed Al Ragman Al-Nakib Hospital',
      latitude: 33.5662997,
      longitude: 35.3897727,
    },
    {
      name: 'Kassab Hospital',
      latitude: 33.5687391,
      longitude: 35.3915912,
    },
    {
      name: 'Sibline Governmental Hospital',
      latitude: 33.6172156,
      longitude: 35.43338,
    },
    {
      name: 'Osman Hospital',
      latitude: 33.6142895,
      longitude: 35.465073,
    },
    {
      name: 'Mazboud Central Hospital',
      latitude: 33.6140572,
      longitude: 35.4721352,
    },
    {
      name: 'Hamed Farhat Hospital',
      latitude: 33.6299408,
      longitude: 35.8037823,
    },
    {
      name: 'Kherbi Hospital',
      latitude: 33.6393056,
      longitude: 35.7265615,
    },
    {
      name: 'Ain Wazin Hospital',
      latitude: 33.680799,
      longitude: 35.6108028,
    },
    {
      name: 'Baakleen Medical Center',
      latitude: 33.6785592,
      longitude: 35.5745514,
    },
    {
      name: 'Red Cross Deir Al Qamar',
      latitude: 33.6959305,
      longitude: 35.5530494,
    },
    {
      name: 'Damour Medical Center',
      latitude: 33.7288221,
      longitude: 35.4546767,
    },
    {
      name: 'Medical 2000 Center',
      latitude: 33.8032381,
      longitude: 35.5173063,
    },
    {
      name: 'Al-Imam Hospital',
      latitude: 33.8104245,
      longitude: 35.6128386,
    },
    {
      name: 'Al-Jabal Hospital',
      latitude: 33.8460302,
      longitude: 35.7238519,
    },
    {
      name: 'Taanayel General Hospital',
      latitude: 33.7942143,
      longitude: 35.8761483,
    },
    {
      name: 'Al-Mayyas Hospital',
      latitude: 33.8142398,
      longitude: 35.8537868,
    },
    {
      name: 'Libano Francais Hospital',
      latitude: 33.8333448,
      longitude: 35.9125566,
    },
    {
      name: 'Tel Chiha Hospital',
      latitude: 33.8410601,
      longitude: 35.9054729,
    },
    {
      name: 'Khoury General Hospital',
      latitude: 33.8530381,
      longitude: 35.8957526,
    },
    {
      name: 'Chtoura Hospital',
      latitude: 33.8198109,
      longitude: 35.8584699,
    },
    {
      name: 'St George Hospital',
      latitude: 33.837158,
      longitude: 35.5272788,
    },
    {
      name: 'St Therese Hospital',
      latitude: 33.8449776,
      longitude: 35.5273914,
    },
    {
      name: 'Al-Borj Hospital',
      latitude: 33.8428757,
      longitude: 35.5088037,
    },
    {
      name: 'Al-Rassoul Al-Azam Hospital',
      latitude: 33.8434449,
      longitude: 35.4985242,
    },
    {
      name: 'Sacre Coeur Hospital',
      latitude: 33.8496824,
      longitude: 35.538996,
    },
    {
      name: 'St Charles Hospital',
      latitude: 33.8445454,
      longitude: 35.550614,
    },
    {
      name: 'Bellevue Medical Center',
      latitude: 33.8486042,
      longitude: 35.5594707,
    },
    {
      name: 'Bahman Hospital',
      latitude: 33.853663,
      longitude: 35.5060746,
    },
    {
      name: 'Al-Hayat Hospital',
      latitude: 33.8578405,
      longitude: 35.5253932,
    },
    {
      name: 'Mount Lebanon Hospital',
      latitude: 33.8599409,
      longitude: 35.5280111,
    },
    {
      name: 'Sahel General Hospital',
      latitude: 33.8582314,
      longitude: 35.5037276,
    },
    {
      name: 'Al-Zahra Hospital',
      latitude: 33.8639978,
      longitude: 35.4870631,
    },
    {
      name: 'Dar Al-Ajaza Al-Islamia Hospital',
      latitude: 33.8680546,
      longitude: 35.4986636,
    },
    {
      name: 'Beirut General Hospital',
      latitude: 33.8724274,
      longitude: 35.4915316,
    },
    {
      name: 'Makassed Hospital',
      latitude: 33.8751899,
      longitude: 35.5040737,
    },
    {
      name: 'Dr George Moarbes Hospital',
      latitude: 33.8728984,
      longitude: 35.5190632,
    },
    {
      name: 'Al-Mashrek Hospital',
      latitude: 33.8713562,
      longitude: 35.5405383,
    },
    {
      name: 'Bitar Hospital',
      latitude: 33.8795189,
      longitude: 35.5604658,
    },
    {
      name: 'Hotel Dieu Hospital',
      latitude: 33.8816522,
      longitude: 35.5193676,
    },
    {
      name: 'LAU Medical Center',
      latitude: 33.8853908,
      longitude: 35.5151646,
    },
    {
      name: 'German Lebanese Medical Center',
      latitude: 33.8927707,
      longitude: 35.5636066,
    },
    {
      name: 'Khoury Hospital',
      latitude: 33.8985014,
      longitude: 35.4841757,
    },
    {
      name: 'AUB Medical Center',
      latitude: 33.8979114,
      longitude: 35.4861391,
    },
    {
      name: 'Najjar Hospital',
      latitude: 33.8967905,
      longitude: 35.4866259,
    },
    {
      name: 'Bakhaazi Hospital',
      latitude: 33.8972903,
      longitude: 35.4886965,
    },
    {
      name: 'Clemenceau Medical Center',
      latitude: 33.8977456,
      longitude: 35.4903112,
    },
    {
      name: 'Trad Hospital',
      latitude: 33.8968472,
      longitude: 35.4918227,
    },
    {
      name: 'Lebanese Red Cross HQ',
      latitude: 33.8950839,
      longitude: 35.4950467,
    },
    {
      name: 'Rosary Hospital',
      latitude: 33.8956806,
      longitude: 35.5148897,
    },
    {
      name: 'St George Hospital University Center',
      latitude: 33.8942034,
      longitude: 35.5240105,
    },
    {
      name: 'Geitawi Hospital',
      latitude: 33.8935255,
      longitude: 35.5305015,
    },
    {
      name: 'Bitar Hospital',
      latitude: 33.8795189,
      longitude: 35.5604658,
    },
    {
      name: 'St Joseph Hospital',
      latitude: 33.8931559,
      longitude: 35.5549297,
    },
    {
      name: 'Notre Dame University Hospital',
      latitude: 33.9817768,
      longitude: 35.6276765,
    },
    {
      name: 'Beit Chabab Hospital',
      latitude: 33.9322533,
      longitude: 35.6754574,
    },
    {
      name: 'Kartaba Hospital',
      latitude: 34.0960646,
      longitude: 35.8510858,
    },
    {
      name: 'Maritime Jbeil Hospital',
      latitude: 34.1157015,
      longitude: 35.6524414,
    },
    {
      name: 'Notre Dame Des Secours Hospital',
      latitude: 34.01281095,
      longitude: 35.6590074,
    },
    {
      name: 'Batroun Hospital',
      latitude: 34.2515318,
      longitude: 35.6661314,
    },
    {
      name: 'Tannourine Governmental Hospital',
      latitude: 34.21266758,
      longitude: 35.8610207,
    },
    {
      name: 'Al-Borji Hospital',
      latitude: 34.2988104,
      longitude: 35.8219168,
    },
    {
      name: 'Al-Koura Hospital',
      latitude: 34.3488326,
      longitude: 35.8378813,
    },
    {
      name: 'Centre Hospitaler du Nord',
      latitude: 34.3687407,
      longitude: 35.8981854,
    },
    {
      name: 'Saydet Zgharta Hospital',
      latitude: 34.400049,
      longitude: 35.8854824,
    },
    {
      name: 'Albert Haykal Hospital',
      latitude: 34.4126186,
      longitude: 35.832321,
    },
    {
      name: 'Dar Al-Zahraa Hospital',
      latitude: 34.4154332,
      longitude: 35.8407754,
    },
    {
      name: 'Lebanon Heart Hospital',
      latitude: 34.4192213,
      longitude: 35.8286732,
    },
    {
      name: 'New Mazloum Hospital',
      latitude: 34.4319561,
      longitude: 35.8324552,
    },
    {
      name: 'Nini Hospital',
      latitude: 34.4354161,
      longitude: 35.830583,
    },
    {
      name: 'Bisar Hospital',
      latitude: 34.4394599,
      longitude: 35.8403891,
    },
    {
      name: 'Monla Hospital',
      latitude: 34.4408833,
      longitude: 35.8301431,
    },
    {
      name: 'Family Medical Center',
      latitude: 34.423788,
      longitude: 35.8797801,
    },
    {
      name: 'Al-Kheir Hospital',
      latitude: 34.4825832,
      longitude: 35.9405911,
    },
    {
      name: 'Al-Youssef Medical Center',
      latitude: 34.5430615,
      longitude: 36.0742563,
    },
    {
      name: 'Rahal Akkar Hospital',
      latitude: 34.5499455,
      longitude: 36.0789663,
    },
    {
      name: 'Batoul Hospital',
      latitude: 34.3817123,
      longitude: 36.4243114,
    },
    {
      name: 'Universal Hospital',
      latitude: 34.2684939,
      longitude: 36.3990772,
    },
    {
      name: 'Baalbeck Governmental Hospital',
      latitude: 33.9992889,
      longitude: 36.2140048,
    },
    {
      name: 'Ib Sina Hospital',
      latitude: 34.0278005,
      longitude: 36.1973858,
    },
    {
      name: 'Iaat Public Hospital',
      latitude: 34.0374208,
      longitude: 36.1761642,
    },
    {
      name: 'Dar Al-Amal University',
      latitude: 33.9846114,
      longitude: 36.1626887,
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
          Hospitals
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
          {hospitalData.map((item, index) => {
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
                    source={require('../../assets/hospitalmarker.png')}
                    style={{width: normalize(20), height: normalize(20)}}
                  />
                  <Callout>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.name}>{item.name}</Text>
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

    padding: 10,
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
    fontSize: 16,
    color: 'black',
  },
  // Character image
  image: {
    width: '100%',
    height: 80,
  },
});
