import React, {Component, useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  PixelRatio,
  Dimensions,
  RefreshControl,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {List, Title} from 'react-native-paper';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useSelector, useDispatch} from 'react-redux';
import {getCities} from '../../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import 'moment-timezone';

import Geolocation from 'react-native-geolocation-service';

import {getDistance} from 'geolib';

import moment from 'moment';
import {parse} from '@babel/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Allalerts({navigation, route}) {
  const [refreshing, setRefreshing] = React.useState(false);
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

  const onRefresh = React.useCallback(() => {
    dispatch(getCities());
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [overlayvisible, setOverlayvisible] = useState(false);
  const {cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);

  const [arrayname, setArrayname] = useState('cities');
  const [latitudee, setLatitudee] = useState(0);
  const [longitudee, setLongitudee] = useState(0);

  const [currentDate, setCurrentDate] = useState('');

  const [timee, setTimee] = useState('');
  const [hourdate, setHourdate] = useState('');

  const [fontweight1, setFontweight1] = useState('bold');
  const [fontweight2, setFontweight2] = useState('normal');
  const [fontweight3, setFontweight3] = useState('normal');
  const [fontweight4, setFontweight4] = useState('normal');
  const [fontweight5, setFontweight5] = useState('normal');

  const [color1, setColor1] = useState('white');
  const [color2, setColor2] = useState('#093AA0');
  const [color3, setColor3] = useState('#093AA0');
  const [color4, setColor4] = useState('#093AA0');
  const [color5, setColor5] = useState('#093AA0');

  const [bcolor1, setBcolor1] = useState('#093AA0');
  const [bcolor2, setBcolor2] = useState('white');
  const [bcolor3, setBcolor3] = useState('white');
  const [bcolor4, setBcolor4] = useState('white');
  const [bcolor5, setBcolor5] = useState('white');

  const AddButton = () => {
    return null;
  };

  const [modalVisible, setModalVisible] = useState(false);

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
    setHourdate(hours);

    function requestPermissions() {
      if (Platform.OS === 'ios') {
        const auth = Geolocation.requestAuthorization('whenInUse');
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
        PermissionsAndroid.request(
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

  const pressme = () => {
    setFilters(null);
    const filterss = cities.filter(x => x.generallocation === 'Beirut');
    setFilters(filterss);
    setArrayname('filters');
    setFontweight1('normal');
    setFontweight2('bold');
    setFontweight3('normal');
    setFontweight4('normal');
    setFontweight5('normal');
  };
  const pressme1 = () => {
    setFilters(null);
    const filterss = cities.filter(x => x.generallocation === 'Bekaa');
    setFilters(filterss);
    setArrayname('filters');
    setFontweight1('normal');
    setFontweight2('normal');
    setFontweight3('normal');
    setFontweight4('normal');
    setFontweight5('bold');
  };

  const pressme2 = () => {
    setFilters(null);
    const filterss = cities.filter(x => x.generallocation === 'South');
    setFilters(filterss);
    setArrayname('filters');
    setFontweight1('normal');
    setFontweight2('normal');
    setFontweight3('bold');
    setFontweight4('normal');
    setFontweight5('normal');
  };
  const pressme3 = () => {
    setFilters(null);
    const filterss = cities.filter(x => x.generallocation === 'North');
    setFilters(filterss);
    setArrayname('filters');
    setFontweight1('normal');
    setFontweight2('normal');
    setFontweight3('normal');
    setFontweight4('bold');
    setFontweight5('normal');
  };

  const pressme4 = () => {
    setFilters(null);
    const filterss = cities.filter(x => x.generallocation === 'MountLebanon');
    setFilters(filterss);
    setArrayname('filters');

    setFontweight1('normal');
    setFontweight2('normal');
    setFontweight3('normal');
    setFontweight4('bold');
    setFontweight5('normal');
  };

  const pressmeall = () => {
    setFilters(null);
    const filterss = cities;
    setFilters(filterss);
    setArrayname('cities');
    setFontweight1('bold');
    setFontweight2('normal');
    setFontweight3('normal');
    setFontweight4('normal');
    setFontweight5('normal');
  };

  const doclosefunction = () => {
    setModalVisible(!modalVisible);
    setTimeout(() => {
      navigationscreen.navigate('Login', {yess: '0'});
    }, 1000);
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  const handleclick = () => {
    useNavigation().navigate('Alerts');
  };

  const showAlert2 = stringg => {};
  const alert1 = './alert1.png';
  const navigationscreen = useNavigation();

  const xml1 = `
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="33.431" viewBox="0 0 26 33.431">
  <path id="Subtraction_2" data-name="Subtraction 2" d="M-2823,33.431h0l-9.659-12.557a12.636,12.636,0,0,1-1.5-1.948l-.13-.169h.027A12.13,12.13,0,0,1-2836,12.5a12.188,12.188,0,0,1,3.807-8.842A13.181,13.181,0,0,1-2823,0a13.179,13.179,0,0,1,9.192,3.662A12.188,12.188,0,0,1-2810,12.5a12.141,12.141,0,0,1-1.656,6.112h.017l-.073.095a12.555,12.555,0,0,1-1.777,2.317L-2823,33.43Zm0-26.286a4.562,4.562,0,0,0-4.643,4.465A4.562,4.562,0,0,0-2823,16.076a4.562,4.562,0,0,0,4.642-4.466A4.562,4.562,0,0,0-2823,7.145Z" transform="translate(2836)" fill="#fff"/>
</svg>

`;
  return (
    <SafeAreaView>
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

      <OrientationLoadingOverlay
        visible={overlayvisible}
        color="white"
        indicatorSize="large"
        messageFontSize={24}
        style={styles.overlaycontainer}
      />

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
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
          Latest Alerts
        </Text>

        <TouchableOpacity
          style={{
            borderRadius: 20,
            backgroundColor: 'transparent',
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
            color="transparent"
            style={{justifyContent: 'center', alignSelf: 'center'}}
          />
          <Text
            style={{
              fontSize: normalize(12),
              justifyContent: 'center',
              alignSelf: 'center',
              color: 'transparent',
              marginLeft: '1%',
            }}>
            Dashboard
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: 'transparent',
          margin: '2%',
          height: 'auto',
        }}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarActiveTintColor: '#083591',
            tabBarInactiveTintColor: '#083591',
            tabBarAllowFontScaling: false,
            tabBarScrollEnabled: true,

            tabBarItemStyle: {
              width: 'auto',
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#083591',
            },
            tabBarStyle: {
              justifyContent: 'center',
              backgroundColor: 'transparent',
              shadowColor: 'transparent',
              width: '100%',
            },
          })}>
          <Tab.Screen
            options={{
              tabBarLabelStyle: {
                fontWeight: fontweight1,
                fontSize: normalize(12),
              },
            }}
            name="All Lebanon"
            listeners={{
              tabPress: e => {
                pressmeall();
              },
            }}
            component={AddButton}
          />

          <Tab.Screen
            listeners={{
              tabPress: e => {
                pressme();
              },
            }}
            options={{
              tabBarLabelStyle: {
                fontWeight: fontweight2,
                fontSize: normalize(12),
              },
            }}
            name="Beirut"
            component={AddButton}
          />

          <Tab.Screen
            listeners={{
              tabPress: e => {
                pressme2();
              },
            }}
            options={{
              tabBarLabelStyle: {
                fontWeight: fontweight3,
                fontSize: normalize(12),
              },
            }}
            name="South"
            component={AddButton}
          />

          <Tab.Screen
            listeners={{
              tabPress: e => {
                pressme3();
              },
            }}
            options={{
              tabBarLabelStyle: {
                fontWeight: fontweight4,
                fontSize: normalize(12),
              },
            }}
            name="North"
            component={AddButton}
          />

          <Tab.Screen
            listeners={{
              tabPress: e => {
                pressme1();
              },
            }}
            options={{
              tabBarLabelStyle: {
                fontWeight: fontweight5,
                fontSize: normalize(12),
              },
            }}
            name="Bekaa"
            component={AddButton}
          />
          <Tab.Screen
            listeners={{
              tabPress: e => {
                pressme4();
              },
            }}
            options={{
              tabBarLabelStyle: {
                fontWeight: fontweight5,
                fontSize: normalize(12),
              },
            }}
            name="ML"
            component={AddButton}
          />
        </Tab.Navigator>
        {arrayname == 'filters' ? (
          <>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={filters}
              style={{height: '85%'}}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <>
                  {moment(currentDate).diff(moment(item.datetime), 'hours') <=
                  48 ? (
                    <>
                      <List.Item
                        onPress={() =>
                          route.params.islogged == false
                            ? setModalVisible(true)
                            : navigation.navigate('Detail', {
                                itemId: item.id,
                                date: item.datetime,
                                title: item.title,
                                longitude: item.longitude,
                                latitude: item.latitude,
                                statenews: item.statenews,
                                description: item.description,
                                location: item.location,
                                unit: route.params.unit,
                                division: route.params.division,
                                count: 0,
                                userLat: route.params.userLat,
                                userLong: route.params.userLong,
                              })
                        }
                        title={({size, color}) => (
                          <Text
                            style={{
                              color: '#093AA0',
                              fontSize: normalize(12),
                              fontWeight: 'bold',
                            }}>
                            {item.title}
                          </Text>
                        )}
                        description={({size, color}) => (
                          <>
                            {moment(currentDate).diff(
                              moment(item.datetime),
                              'hours',
                            ) > 24 ? (
                              <>
                                <Text
                                  style={{
                                    color: '#093AA0',
                                    fontSize: normalize(12),
                                  }}>
                                  Yesterday at{' '}
                                  {item.datetime.split('T')[1].trim()}
                                  {item.datetime
                                    .split('T')[1]
                                    .split(':')[0]
                                    .trim() > 12 ? (
                                    <> PM </>
                                  ) : (
                                    <> AM </>
                                  )}
                                  {moment(item.datetime).format('MMMM DD')}{' '}
                                </Text>
                              </>
                            ) : (
                              <>
                                <Text
                                  style={{
                                    color: '#093AA0',
                                    fontSize: normalize(12),
                                  }}>
                                  {moment(currentDate).diff(
                                    moment(item.datetime),
                                    'hours',
                                  )}{' '}
                                  hours ago at{' '}
                                  {item.datetime.split('T')[1].trim()}
                                  {item.datetime
                                    .split('T')[1]
                                    .split(':')[0]
                                    .trim() > 12 ? (
                                    <> PM </>
                                  ) : (
                                    <> AM </>
                                  )}{' '}
                                  {moment(item.datetime).format('MMMM DD')}{' '}
                                </Text>
                              </>
                            )}

                            {(longitudee == 0) & (latitudee == 0) ? (
                              <></>
                            ) : (
                              <>
                                <Text
                                  style={{
                                    color: '#093AA0',
                                    fontSize: normalize(12),
                                  }}>
                                  {getDistance(
                                    {
                                      latitude: latitudee,
                                      longitude: longitudee,
                                    },
                                    {
                                      latitude: item.latitude,
                                      longitude: item.longitude,
                                    },
                                  ) * route.params.division}{' '}
                                  {route.params.unit}
                                </Text>
                              </>
                            )}
                          </>
                        )}
                        left={props => (
                          <List.Icon
                            {...props}
                            color="#093AA0"
                            style={{alignSelf: 'center'}}
                            icon={({size, color}) => (
                              <Image
                                source={
                                  item.statenews == 'Shootings'
                                    ? require('../../assets/alert1.png')
                                    : item.statenews == 'RoadBlocks'
                                    ? require('../../assets/alert2.png')
                                    : item.statenews == 'Protests'
                                    ? require('../../assets/alert3.png')
                                    : item.statenews == 'StateOfAlert'
                                    ? require('../../assets/alert4.png')
                                    : item.statenews == 'Grenade'
                                    ? require('../../assets/alert5.png')
                                    : item.statenews == 'StateOfEmergency'
                                    ? require('../../assets/alert6.png')
                                    : require('../../assets/alert1.png')
                                }
                                style={
                                  item.statenews == 'StateOfAlert'
                                    ? styles.imagefit2
                                    : item.statenews == 'Grenade'
                                    ? styles.imagefit3
                                    : styles.imagefit
                                }
                              />
                            )}
                          />
                        )}
                        right={props => (
                          <List.Icon
                            {...props}
                            color="white"
                            style={{alignSelf: 'center'}}
                            icon={({size, color}) => (
                              <Icon
                                name="chevron-right"
                                size={normalize(12)}
                                color="#093A9E"
                                style={{
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                }}
                              />
                            )}
                          />
                        )}
                      />
                      <View
                        style={{
                          height: 1,
                          width: '100%',
                          backgroundColor: '#CED0CE',
                        }}
                      />
                    </>
                  ) : null}
                </>
              )}
            />
          </>
        ) : (
          <>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={cities}
              style={{height: '85%'}}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <>
                  {moment(currentDate).diff(moment(item.datetime), 'hours') <=
                  48 ? (
                    <>
                      <List.Item
                        onPress={() =>
                          route.params.islogged == false
                            ? setModalVisible(true)
                            : navigation.navigate('Detail', {
                                itemId: item.id,
                                date: item.datetime,
                                title: item.title,
                                longitude: item.longitude,
                                latitude: item.latitude,
                                statenews: item.statenews,
                                description: item.description,
                                location: item.location,
                                unit: route.params.unit,
                                division: route.params.division,
                                count: 0,
                                userLat: route.params.userLat,
                                userLong: route.params.userLong,
                              })
                        }
                        title={({size, color}) => (
                          <Text
                            style={{
                              color: '#093AA0',
                              fontSize: normalize(12),
                              fontWeight: 'bold',
                            }}>
                            {item.title}
                          </Text>
                        )}
                        description={({size, color}) => (
                          <>
                            {moment(currentDate).diff(
                              moment(item.datetime),
                              'hours',
                            ) > 24 ? (
                              <>
                                <Text
                                  style={{
                                    color: '#093AA0',
                                    fontSize: normalize(12),
                                  }}>
                                  {moment(currentDate).diff(
                                    moment(item.datetime),
                                    'hours',
                                  )}{' '}
                                  hours ago at{' '}
                                  {item.datetime.split('T')[1].trim()}
                                  {item.datetime
                                    .split('T')[1]
                                    .split(':')[0]
                                    .trim() > 12 ? (
                                    <> PM </>
                                  ) : (
                                    <> AM </>
                                  )}{' '}
                                  {moment(item.datetime).format('MMMM DD')}{' '}
                                </Text>
                              </>
                            ) : (
                              <>
                                <Text
                                  style={{
                                    color: '#093AA0',
                                    fontSize: normalize(12),
                                  }}>
                                  {moment(currentDate).diff(
                                    moment(item.datetime),
                                    'hours',
                                  )}{' '}
                                  hours ago at{' '}
                                  {item.datetime.split('T')[1].trim()}
                                  {item.datetime
                                    .split('T')[1]
                                    .split(':')[0]
                                    .trim() > 12 ? (
                                    <> PM </>
                                  ) : (
                                    <> AM </>
                                  )}{' '}
                                  {moment(item.datetime).format('MMMM DD')}{' '}
                                </Text>
                              </>
                            )}

                            {(longitudee == 0) & (latitudee == 0) ? (
                              <></>
                            ) : (
                              <>
                                <Text
                                  style={{
                                    color: '#093AA0',
                                    fontSize: normalize(12),
                                  }}>
                                  {getDistance(
                                    {
                                      latitude: latitudee,
                                      longitude: longitudee,
                                    },
                                    {
                                      latitude: item.latitude,
                                      longitude: item.longitude,
                                    },
                                  ) * route.params.division}{' '}
                                  {route.params.unit}
                                </Text>
                              </>
                            )}
                          </>
                        )}
                        left={props => (
                          <List.Icon
                            {...props}
                            color="#093AA0"
                            style={{alignSelf: 'center'}}
                            icon={({size, color}) => (
                              <Image
                                source={
                                  item.statenews == 'Shootings'
                                    ? require('../../assets/alert1.png')
                                    : item.statenews == 'RoadBlocks'
                                    ? require('../../assets/alert2.png')
                                    : item.statenews == 'Protests'
                                    ? require('../../assets/alert3.png')
                                    : item.statenews == 'StateOfAlert'
                                    ? require('../../assets/alert4.png')
                                    : item.statenews == 'Grenade'
                                    ? require('../../assets/alert5.png')
                                    : item.statenews == 'StateOfEmergency'
                                    ? require('../../assets/alert6.png')
                                    : require('../../assets/alert1.png')
                                }
                                style={
                                  item.statenews == 'StateOfAlert'
                                    ? styles.imagefit2
                                    : item.statenews == 'Grenade'
                                    ? styles.imagefit3
                                    : styles.imagefit
                                }
                              />
                            )}
                          />
                        )}
                        right={props => (
                          <List.Icon
                            {...props}
                            color="white"
                            style={{alignSelf: 'center'}}
                            icon={({size, color}) => (
                              <Icon
                                name="chevron-right"
                                size={normalize(12)}
                                color="#093A9E"
                                style={{
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                }}
                              />
                            )}
                          />
                        )}
                      />
                      <View
                        style={{
                          height: 1,
                          width: '100%',
                          backgroundColor: '#CED0CE',
                        }}
                      />
                    </>
                  ) : null}
                </>
              )}
            />
          </>
        )}
      </View>

      <TouchableWithoutFeedback
        onPress={() =>
          navigationscreen.navigate('Dashboard', {
            unit: route.params.unit,
            division: route.params.division,
            count: 1,
            isloggedd: route.params.islogged,
            userLat: route.params.userLat,
            userLong: route.params.userLong,
          })
        }>
        <LinearGradient
          colors={['#082D7B', '#082D7B']}
          style={{
            width: normalize(20),
            height: normalize(20),
            padding: 5,
            borderRadius: normalize(16),
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginRight: '2%',
          }}>
          <Ionicons
            name="location-sharp"
            size={normalize(12)}
            color="white"
            style={{alignSelf: 'center'}}
          />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    logindata: state.loginreducer,
  };
};

export default connect(mapStateToProps, null)(Allalerts);

const styles = StyleSheet.create({
  overlaycontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyle: {
    marginLeft: '2%',

    borderRadius: 50,
    padding: '1%',
    borderWidth: 1,
  },
  imagesource: {
    width: 50,
    height: 50,
  },
  imagefit2: {
    width: 50,
    height: 45,
  },
  imagefit: {
    width: 50,
    height: 50,
  },
  imagefit3: {
    width: 42,
    height: 52,
  },

  mapimage: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  filterbutton: {
    width: 'auto',
    height: 'auto',

    borderRadius: 20,
  },
  filtercontainer: {
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 50,
    padding: '1%',
    width: 100,
    textAlign: 'center',
    alignItems: 'center',
    marginRight: '1%',
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
