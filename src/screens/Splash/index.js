import React from 'react'
import { View, Text ,Image,StyleSheet,SafeAreaView } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';
import  {useState, useEffect} from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import SplashScreen from 'react-native-lottie-splash-screen';

 function Splash(props) {
    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();

    const hideSplashScreen = () => {
        setIsVisible(false);
    }

    useEffect(() => {
      setTimeout(() => {
        SplashScreen.hide(); // here
      },4000);
           
  setTimeout(() => {
            if(props.logindata.isLoggedIn == true) { navigation.navigate('Profile');}
            else {
            navigation.navigate('Login',{yess:"0"});}
  },5000);
        
    }, []);

    const renderSplash = () => {
        return (
            <SafeAreaView style={styles.container}>
<View>

                <View style={styles.circle}>
                <LinearGradient
          colors={[ '#072C78' , '#072C78' ,'#072C78','#093A9E' ,'#5D729B' ,'#072C78'  ,'#072C78' ,'#072C78','#072C78']}
          style={styles.linearGradient}     start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >


        </LinearGradient>
                </View>
              
            <View style={styles.SplashScreen_RootView} >
               
                
                    <Image source={ require('../../assets/MSshield.png')} 
                     style={styles.image}
                  />
                </View>
                </View>
            </SafeAreaView>
        )
    }

    return (
       <></>
    )
}
const mapStateToProps = (state) =>{
    return  {
      logindata : state.loginreducer
    }
      
    }
    
    export default connect (mapStateToProps ,null)(Splash)


const styles = StyleSheet.create ({
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        width: wp('105%'),
        height: hp('75%'),
      },
    container:{
        flex: 1,
        backgroundColor: 'transparent',
      },


      SplashScreen_RootView:{
         backgroundColor:"green"
      }
    ,
     circle:{
        width: wp('105%'),
    height: hp('75%'),
 
   borderRadius: 200,
   alignSelf:"center",
   marginTop:hp('-25%')
     },
    

    
          image:{
        width:wp('85%'),
        height:350,
        marginTop:hp('-27%'),
      
        alignSelf:"center",
        resizeMode: 'contain',
       
    },

     
  })