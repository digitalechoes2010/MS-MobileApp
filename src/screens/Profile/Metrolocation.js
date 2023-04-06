import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  PixelRatio,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function Metrolocation(props) {
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 320;

  const [markerDirections, setMarkerDirections] = useState(false);

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
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          toolbarEnabled={false}
          region={{
            latitude: 33.884097,
            longitude: 35.490646,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            style={{width: 50, height: 50}}
            onPress={() => {
              setMarkerDirections(true);
            }}
            coordinate={{latitude: 33.884097, longitude: 35.490646}}
            title="Metropolitan Security">
            <Image
              style={{width: 50, height: 50}}
              resizeMode="contain"
              source={require('../../assets/MSshield.png')}
            />
          </Marker>
        </MapView>
        <TouchableOpacity
          onPress={() =>
            onDirectionButton(33.884097, 35.490646, 'Metropolitan Security')
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
  );
}

export default Metrolocation;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '96%',
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
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
});
