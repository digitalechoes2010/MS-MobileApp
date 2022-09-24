import React, {Component, useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {RadioButtonItem} from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Dashboard({route, navigation}) {
  const [overlayvisible, setOverlayvisible] = useState(false);
  const [latitudee, setLatitudee] = useState(route.params.userLat);
  const [longitudee, setLongitudee] = useState(route.params.userLong);

  const [markerDirections, setMarkerDirections] = useState(false);
  const [markerLat, setMarkerLat] = useState(latitudee);
  const [markerLong, setMarkerLong] = useState(longitudee);
  const [markerLabel, setMarkerLabel] = useState('');

  {
    console.log('sdsds', markerLat + ' ' + markerLong);
  }

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

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}>
          {route.params.count == 0 ? (
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
              onPress={() => navigation.goBack()}>
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
          ) : route.params.count == 1 ? (
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
              onPress={() => navigation.goBack()}>
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
          ) : route.params.count == 2 ? (
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
              onPress={() => navigation.goBack()}>
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
                Alerts Map
              </Text>
            </TouchableOpacity>
          ) : route.params.count == 3 ? (
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
                navigation.navigate('Mapdetail', {
                  longitude: route.params.longitude,
                  latitude: route.params.latitude,
                  unit: route.params.unit,
                  division: route.params.division,
                  userLatitude: latitudee,
                  userLongitude: longitudee,
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
                Alerts Map
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{alignSelf: 'center', width: '90%'}}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: '10%',
              color: 'black',
              fontSize: normalize(12),
            }}>
            {route.params.date.split('T')[0].trim()}
            at {route.params.date.split('T')[1].trim()}
            {route.params.date.split('T')[1].split(':')[0].trim() > 12 ? (
              <> PM </>
            ) : (
              <> AM </>
            )}
          </Text>
          <Text
            style={{fontSize: normalize(12), marginTop: '10%', color: 'black'}}>
            {route.params.title}
          </Text>
            <MapView
              zoomEnabled={false}
              scrollEnabled={false}
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{ height: 240, marginTop: '5%' }}
              toolbarEnabled={false}
              region={{
                latitude: parseFloat(route.params.latitude),
                longitude: parseFloat(route.params.longitude),
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}>
              <Marker
                style={{ width: normalize(20), height: normalize(20) }}
                key={route.params.itemId.toString()}
                onPress={() => {
                  setMarkerDirections(true),
                    setMarkerLat(parseFloat(route.params.latitude)),
                    setMarkerLong(parseFloat(route.params.longitude)),
                    setMarkerLabel(route.params.title);
                } }
                coordinate={{
                  latitude: parseFloat(route.params.latitude),
                  longitude: parseFloat(route.params.longitude),
                }}>
                <Image
                  source={route.params.statenews == 'Shootings'
                    ? require('../../assets/alert1.png')
                    : route.params.statenews == 'RoadBlocks'
                      ? require('../../assets/alert2.png')
                      : route.params.statenews == 'Protests'
                        ? require('../../assets/alert3.png')
                        : route.params.statenews == 'StateOfAlert'
                          ? require('../../assets/alert4.png')
                          : route.params.statenews == 'Grenade'
                            ? require('../../assets/alert5.png')
                            : route.params.statenews == 'StateOfEmergency'
                              ? require('../../assets/alert6.png')
                              : require('../../assets/alert1.png')}
                  style={{ width: normalize(20), height: normalize(20) }}
                  resizeMode="contain" />
                <Callout
                  style={{
                    flex: -1,
                    position: 'absolute',
                    width: 250,
                    textAlign: 'center',
                  }}>
                  <Text allowFontScaling={false} style={styles.name}>
                    {route.params.title}
                  </Text>
                </Callout>
              </Marker>
            </MapView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                display: markerDirections === true ? 'flex' : 'none',
              }}>
                <TouchableOpacity
                  onPress={() => onDirectionButton(markerLat, markerLong, markerLabel)}
                  style={{
                    padding: '2%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FontAwesome5
                    name="directions"
                    size={normalize(20)}
                    color="#082D7B" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Mapdetail', {
                    longitude: route.params.longitude,
                    latitude: route.params.latitude,
                    unit: route.params.unit,
                    division: route.params.division,
                    userLatitude: latitudee,
                    userLongitude: longitudee,
                  })}
                  style={{
                    padding: '2%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FontAwesome
                    name="map"
                    size={normalize(20)}
                    color="#082D7B" />
                </TouchableOpacity>
              </View>
          <Text
            style={{color: 'black', fontSize: normalize(12)}}>
            Location: {route.params.location}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: normalize(12),
              textAlign: 'justify',
              marginTop: '4%',
            }}>
            {route.params.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#fff',
    borderRadius: 6,

    padding: 15,
    width: 490,
  },

  name: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
});
