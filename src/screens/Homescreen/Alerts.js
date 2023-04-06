import React, {useState, useEffect} from 'react';
import {
  PixelRatio,
  RefreshControl,
  Pressable,
  Animated,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';

import {List} from 'react-native-paper';
import {SvgXml} from 'react-native-svg';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {getCities} from '../../redux/actions';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import Linear3 from './Test3';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import Linear2 from './Test2';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Alerts(props) {
  console.log(props.latitude);
  console.log(props.longitude);
  const [refreshing, setRefreshing] = React.useState(false);
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  const scale = SCREEN_WIDTH / 320;
  const onRefresh = React.useCallback(() => {
    dispatch(getCities());
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  const navigationscreen = useNavigation();
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

  const xml1 = `
      <svg xmlns="http://www.w3.org/2000/svg" width="17.11" height="22" viewBox="0 0 17.11 22">
        <path id="Subtraction_2" data-name="Subtraction 2" d="M8.555,22h0L2.2,13.736a8.309,8.309,0,0,1-.987-1.282l-.085-.111h.018A7.992,7.992,0,0,1,2.505,2.41,8.675,8.675,0,0,1,8.555,0,8.673,8.673,0,0,1,14.6,2.41a7.993,7.993,0,0,1,1.416,9.841h.011l-.048.062a8.268,8.268,0,0,1-1.17,1.525L8.556,22Zm0-17.3A3,3,0,0,0,5.5,7.641,3,3,0,0,0,8.555,10.58,3,3,0,0,0,11.61,7.641,3,3,0,0,0,8.555,4.7Z" fill="#fff"/>
      </svg>
      
      `;
  const {cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);

  const [arrayname, setArrayname] = useState('cities');
  const [arrayDistance, setArrayDistance] = useState([]);
  

  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const [timee, setTimee] = useState('');
  const [hourdate, setHourdate] = useState('');

  const [fontweight1, setFontweight1] = useState('bold');
  const [fontweight2, setFontweight2] = useState('normal');
  const [fontweight3, setFontweight3] = useState('normal');
  const [fontweight4, setFontweight4] = useState('normal');
  const [fontweight5, setFontweight5] = useState('normal');

  const [color1, setColor1] = useState('#093AA0');
  const [color2, setColor2] = useState('white');
  const [color3, setColor3] = useState('white');
  const [color4, setColor4] = useState('white');
  const [color5, setColor5] = useState('white');

  const [bcolor1, setBcolor1] = useState('white');
  const [bcolor2, setBcolor2] = useState('#093AA0');
  const [bcolor3, setBcolor3] = useState('#093AA0');
  const [bcolor4, setBcolor4] = useState('#093AA0');
  const [bcolor5, setBcolor5] = useState('#093AA0');
  
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

    setCurrentDate(year + '-' + month + '-' + date + 'T' + hours + ':' + min);

    setHourdate(hours);
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
  const AddButton = () => {
    return null;
  };

  const doclosefunction = () => {
    setModalVisible(!modalVisible);
    setTimeout(() => {
      navigationscreen.navigate('Login', {yess: '0'});
    }, 1000);
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

      <Animatable.View
        animation="slideInLeft"
        delay={1000}
        useNativeDriver={true}
        style={styles.containalerts}>
        <LinearGradient
          colors={['#038FCE', '#056AB5', '#083B95', '#083B95']}
          start={{x: 0, y: 0}}
          style={{
            display: 'flex',
            padding: '2%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
          end={{x: 1, y: 1}}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: normalize(12),
            }}>
            Latest Alerts
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigationscreen.navigate('Dashboard', {
                  unit: props.unit,
                  division: props.division,
                  count: 0,
                  isloggedd: props.logindata.isLoggedIn,
                  userLat: props.latitude,
                  userLong: props.longitude,
                })
              }>
              <Ionicons
                name="location-sharp"
                size={normalize(12)}
                color="white"
              />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() =>
                navigationscreen.navigate('Alerts', {
                  unit: props.unit,
                  division: props.division,
                  islogged: props.logindata.isLoggedIn,
                  userLat: props.latitude,
                  userLong: props.longitude,
                })
              }>
              <Text
                style={{
                  color: 'white',
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                  marginLeft: 10,
                  fontSize: normalize(12),
                }}>
                View All
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#038FCE', '#056AB5', '#083B95', '#083B95']}
          start={{x: 0, y: 0}}
          style={{height: '12.5%', width: '100%', justifyContent: 'center'}}
          end={{x: 1, y: 1}}>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'white',
              tabBarAllowFontScaling: false,
              tabBarScrollEnabled: true,

              tabBarItemStyle: {
                height: '100%',
                width: 'auto',
              },
              tabBarIndicatorStyle: {
                backgroundColor: 'white',
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
        </LinearGradient>
        {console.log('BBB', props.latitude + ' ' + props.longitude)}
        <ScrollView>
          {arrayname == 'filters' ? (
            <>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{
                  height: 'auto',
                  backgroundColor: '#F9F9F9',
                  borderBottomLeftRadius: 7,
                  borderBottomRightRadius: 7,
                  shadowColor: '#536A9B',
                  shadowOffset: {
                    height: 2,
                    width: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                data={filters}
                renderItem={({item}) => (
                  <>
                    {moment(currentDate).diff(moment(item.datetime), 'hours') <=
                    48 ? (
                      <>
                        <List.Item
                          onPress={() =>
                            props.logindata.isLoggedIn == false
                              ? setModalVisible(true)
                              : navigationscreen.navigate('Detail', {
                                  itemId: item.id,
                                  date: item.datetime,
                                  title: item.title,
                                  longitude: item.longitude,
                                  latitude: item.latitude,
                                  statenews: item.statenews,
                                  description: item.description,
                                  location: item.location,
                                  unit: props.unit,
                                  division: props.division,
                                  count: 1,
                                  userLat: props.latitude,
                                  userLong: props.longitude,
                                })
                          }
                          title={({size, color}) => (
                            <Text
                              style={{
                                color: '#424242',
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
                                      color: '#727272',
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
                                      color: '#727272',
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

                              {(props.longitude == '') &
                              (props.latitude == '') ? (
                                <></>
                              ) : (
                                <>
                                  <Text
                                    style={{
                                      color: '#8E8E8E',
                                      fontSize: normalize(12),
                                    }}>
                                  {props.distanceData === 'Km' ? Math.round(getDistance(
                                      {
                                        latitude: props.latitude,
                                        longitude: props.longitude,
                                      },
                                      {
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                      },
                                    ) * 0.001) : (Math.round(getDistance(
                                      {
                                        latitude: props.latitude,
                                        longitude: props.longitude,
                                      },
                                      {
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                      },
                                    ) * 0.00062))}{' '}
                                    {props.distanceData === 'Km' ? 'Km' : 'Miles'}
                                  </Text>
                                </>
                              )}
                            </>
                          )}
                          left={props => (
                            <List.Icon
                              {...props}
                              color="white"
                              style={{alignSelf: 'center', color: 'white'}}
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
                                  color="#737373"
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
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                keyExtractor={item => item.id}
                style={{
                  height: 'auto',
                  backgroundColor: '#F9F9F9',
                  borderBottomLeftRadius: 7,
                  borderBottomRightRadius: 7,
                }}
                data={cities}
                renderItem={({item}) => (
                  <>
                    {moment(currentDate).diff(moment(item.datetime), 'hours') <=
                    48 ? (
                      <>
                        <List.Item
                          onPress={() =>
                            props.logindata.isLoggedIn == false
                              ? setModalVisible(true)
                              : navigationscreen.navigate('Detail', {
                                  itemId: item.id,
                                  date: item.datetime,
                                  title: item.title,
                                  longitude: item.longitude,
                                  latitude: item.latitude,
                                  statenews: item.statenews,
                                  description: item.description,
                                  location: item.location,
                                  unit: props.unit,
                                  division: props.division,
                                  count: 1,
                                  userLat: props.latitude,
                                  userLong: props.longitude,
                                })
                          }
                          title={({size, color}) => (
                            <Text
                              style={{
                                color: '#424242',
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
                                      color: '#727272',
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
                                      color: '#727272',
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

                              {(props.longitude == '') &
                              (props.latitude == '') ? (
                                <></>
                              ) : (
                                <>
                                  <Text
                                    style={{
                                      color: '#8E8E8E',
                                      fontSize: normalize(12),
                                    }}>
                                    {props.distanceData === 'Km' ? Math.round(getDistance(
                                      {
                                        latitude: props.latitude,
                                        longitude: props.longitude,
                                      },
                                      {
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                      },
                                    ) * 0.001) : (Math.round(getDistance(
                                      {
                                        latitude: props.latitude,
                                        longitude: props.longitude,
                                      },
                                      {
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                      },
                                    ) * 0.00062))}{' '}
                                    {props.distanceData === 'Km' ? 'Km' : 'Miles'}
                                  </Text>
                                </>
                              )}
                            </>
                          )}
                          left={props => (
                            <List.Icon
                              {...props}
                              color="white"
                              style={{alignSelf: 'center', color: 'white'}}
                              size={normalize(12)}
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
                                  color="#737373"
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
        </ScrollView>
      </Animatable.View>
    </>
  );
}

const mapStateToProps = state => {
  return {
    logindata: state.loginreducer,
    distanceData: state.DistanceReducer.distance,
  };
};

export default connect(mapStateToProps, null)(Alerts);

const styles = StyleSheet.create({
  containalerts: {
    height: hp('40%'),
    position: 'relative',
    width: '100%',
    marginTop: '3%',
  },
  textstyle: {
    marginLeft: '2%',

    borderRadius: 50,
    padding: '1%',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
    borderColor: 'white',
  },
  imagefit3: {
    width: 40,
    height: 45,
    alignSelf: 'center',
  },
  imagefit: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  imagefit2: {
    width: 40,
    height: 37,
    alignSelf: 'center',
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
