import {useNavigation} from '@react-navigation/native';
import { routerActions } from 'connected-react-router';
import React, {useState,useEffect,useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,BackHandler,Platform, Dimensions, PixelRatio, SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {requestLogin} from '../../redux/Loginaction';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const LoginForm = props => {
  const navigationscreen = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible2, setModalVisible2] = useState(false);

  console.log(route.params.yess);
  
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

  
useFocusEffect(
  useCallback(() => {
    // Do something when the screen is focused/mount
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      // Do something when the screen is unfocused/unmount
      // Useful for cleanup functions
    
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []));

const  handleBackButtonClick = () => {
  BackHandler.exitApp();
return true;
}


useEffect(() => {


  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;     //<--------Set allowFontScaling false for Screen

 if(route.params.yess == "1"){
   setModalVisible3(true);
   setIsLoading(false);
  

  
   }
 else {
  setModalVisible3(false);
  
 }
 if(props.logindata.isLoggedIn == true){
  
  setTimeout(() => {
    setIsLoading(false)},20000)
}

  });

  const [modalVisible3, setModalVisible3] = useState(false);

  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async (userName, password) => {
    if (data.username.length == 0 || data.password.length == 0) {
      setModalVisible(true);
      console.log('modal1');
      setIsLoading(false);
      return;
    }

    if (data.isValidPassword == false) {
      setIsLoading(false);
      setModalVisible2(true);
      console.log('modal2');
      return;
    }

    const logincredentials = {email: userName, password: password};
  

    await props.doLogin(logincredentials);
    props.logindata.isLoggedIn == false
      ? () => {
          setModalVisible3(true);
          console.log('modal3');
        }
      : null;

    
      
     
    console.log('logggggggggggggggggg', props.logindata.isLoggedIn);
    console.log(
      'errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
      props.logindata.errors,
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.containerr}>
      <TouchableOpacity
        delayPressIn={0}
        onPress={() => navigationscreen.navigate('Profile')}
        style={styles.skipdiv}>
        <Text  allowFontScaling={false}
          style={{
            color: 'white',
            fontSize: normalize(12),
          }}>
          Skip  
        </Text>
      </TouchableOpacity>
        <View>
          <Modal testID={'modal'} isVisible={modalVisible}>
            <View style={styles.content}>
            <Text style={[styles.contentTitle, {fontSize:normalize(12)}]}>Wrong Input!</Text>
            <Text style={{color:"black", fontWeight:normalize(12)}}>Email or password cannot be empty.</Text>

              <Text
                style={[styles.buttonnn, {fontSize:normalize(12)}]}
                onPress={() => setModalVisible(!modalVisible)}>
                okay
              </Text>
            </View>
          </Modal>

          <Modal testID={'modal'} isVisible={modalVisible2}>
            <View style={styles.content}>
              <Text style={[styles.contentTitle, {fontSize:normalize(12)}]}>Wrong Input!</Text>
              <Text style={{color:"black", fontWeight:normalize(12)}}>Invalid password.</Text>

              <Text
                style={[styles.buttonnn, {fontSize:normalize(12)}]}
                onPress={() => setModalVisible2(!modalVisible2)}>
                okay
              </Text>
            </View>
          </Modal>

          <Modal testID={'modal'} isVisible={modalVisible3}>
            <View style={styles.content}>
            <Text style={[styles.contentTitle, {fontSize:normalize(12)}]}>Wrong Input!</Text>
            <Text style={{color:"black", fontWeight:normalize(12)}}>Invalid email or password.</Text>

            <Text
                style={[styles.buttonnn, {fontSize:normalize(12)}]}
                onPress={() =>{ setModalVisible3(!modalVisible3),
                  route.params.yess = "0"
                }}>
                okay
              </Text>
            </View>
          </Modal>

          <View style={styles.circle}>
            <LinearGradient
              colors={[
                '#072C78',
                '#072C78',
                '#072C78',
                '#093A9E',
                '#5D729B',
                '#072C78',
                '#072C78',
                '#072C78',
                '#072C78',
              ]}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}></LinearGradient>
          </View>

          <View style={styles.SplashScreen_RootView}>
            <Image
              source={require('../../assets/MSshield.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
        {/* <View style={styles.action} > */}
        <TextInput allowFontScaling={false}
          placeholder="Email"  placeholderTextColor="#000" 
          style={[styles.input2, {fontSize:normalize(12)}]}
          autoCapitalize="none"
          onChangeText={val => textInputChange(val)}
          onEndEditing={e => handleValidUser(e.nativeEvent.text)}
        />
        {/* </View> */}

        <View style={styles.action} >
          <TextInput allowFontScaling={false}  placeholderTextColor="#000" 
            placeholder="Password"
            style={[styles.input, {fontSize:normalize(12)}]}
            secureTextEntry={data.secureTextEntry ? true : false}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
             <TouchableOpacity
            // style={{width:'15%'}}
            onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={normalize(12)} />
            ) : (
              <Feather name="eye" color="grey" size={normalize(12)} />
            )}
          </TouchableOpacity>



       
        </View>

        {data.isValidPassword ? null : (
          <Text style={[styles.error, {fontSize:normalize(12)}]}>Password must be 8 characters long.</Text>
        )}

        <Text style={[styles.textstyle, {fontSize:normalize(12)}]}  allowFontScaling={false}>
          In order to use the app, you will have to be provided with the
          necessary credentials by the IT department at Metropolitan Security.
          For more information feel free to contact customer service.
        </Text>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#1F3E80',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            padding: 9,
            borderRadius: 15,
            marginTop: 16,
          }}
          onPress={() => {
            setIsLoading(true);
            loginHandle(data.username, data.password);
          }}>
          {isLoading == false ? (
            <Text  allowFontScaling={false} style={[styles.button, {fontSize:normalize(12)}]}>Sign In</Text>
          ) : (
            <ActivityIndicator
              size="small"
              color="white"
              style={{alignSelf: 'center',width:62,padding:4}}
            />
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerr: {
    // flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 30,
    marginTop: 16,
    color: 'white',
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginLeft: 36,
    marginRight: 36,
  },
  input: {
    fontSize: 18,
    borderRadius: 10,color:"black",alignSelf:"center"
  },
  input2: {
    fontSize: 18,
    borderWidth: 1,
    padding: '1%',
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 16,
    color:"black",alignSelf:"center"
  },

  image: {
    width: 50,
    height: 50,
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 100,
  },
  button: {
    fontSize: 22,
    color: 'white',
padding: '1%',
    textAlign: 'center',
  },
  linearGradient: {
    width: wp('100%'),
    height: hp('85%'),
    borderRadius: 700,
    backgroundColor: 'red',
    transform: [{scaleX: 1.5}],
    marginTop: hp('-60%'),
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  circle: {
    width: wp('100%'),
  },

  image: {
    width: wp('45%'),
    height: 250,
    marginTop: hp('-10%'),

    alignSelf: 'center',
  },
  textstyle: {
    textAlign: 'center',
    color: '#231F54',
    width: '80%',
    marginTop: '5%',
  },
  action: {
    flexDirection: 'row',
    marginTop: 16,
    alignContent: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: '1%',
    alignItems: 'center',width:'80%'
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,color:"black"
  },
  buttonnn: {
    fontSize: 20,
    color: 'white',
    width: 100,
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: '#1F3E80',
    padding: 8,
    textAlign: 'center',
  },
  skipdiv:{
    // display: 'flex',
    // flexDirection: 'row',
    zIndex: 1,
    // height: 30,
    // alignItems: 'center',
    // position: 'absolute',
    marginTop: '5%',
    // marginLeft: '85%',
    alignSelf: 'flex-end',
    marginRight: '5%',
  }
});

const mapDispatchToProps = dispatch => ({
  doLogin: params => dispatch(requestLogin(params)),
});
const mapStateToProps = state => {
  return {
    logindata: state.loginreducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
