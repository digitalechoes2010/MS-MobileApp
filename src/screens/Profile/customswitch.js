import React, {useState} from 'react';

import { Text, View, TouchableOpacity, Platform, Dimensions, PixelRatio} from 'react-native';
import {connect} from 'react-redux';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
  distanceData
}) => {
  const [getSelectionMode, setSelectionMode] = useState(distanceData);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };
  
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

  return (
    <View >
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData('Km')}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode === 'Km' ? selectionColor : 'transparent',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode === 'Km' ? 'white' : '#093A9E',
              fontSize: normalize(12)
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData('Miles')}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode === 'Miles' ? selectionColor : 'transparent',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode === 'Miles' ? 'white' : '#093A9E',
              fontSize: normalize(12)
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    distanceData: state.DistanceReducer.distance,
  };
};

export default connect(mapStateToProps, null)(CustomSwitch);