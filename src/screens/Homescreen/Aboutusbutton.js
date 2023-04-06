import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Animated,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Easing,
} from 'react-native';
import {Portal, Provider, List} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Myinformation from '../Profile/Myinformation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import CustomSwitch from '../Profile/customswitch';
import {logout} from '../../redux/Loginaction';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getspecialnews} from '../../redux/actions';

import * as OpenAnything from 'react-native-openanything';


const Aboutusbutton = props => {
  const bottomSheetHeight = Dimensions.get('window').height * 0.9;
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get('window').width;
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
  const [open, setOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [unitvalue, setUnitvalue] = useState('miles');

  const {specialnews} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onSelectSwitch = index => {
    if (index == 1) {
      setUnitvalue('kilometers');
      props.updatekm();
    } else {
      setUnitvalue('miles');
      props.updatemiles();
    }
  };

  const onGesture = event => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = event => {
    if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
      setOpen(false);
    } else {
      bottom.setValue(0);
    }
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '92%',
          backgroundColor: '#CED0CE',
          marginLeft: '4%',
        }}
      />
    );
  };

  useEffect(() => {
    dispatch(getspecialnews());
    if(props.logindata.isLoggedIn == true){
    checkImage('https://echoes.agency/files/'+props.logindata.userData.email+'.png');}
    if (open) {
      setOpen(open);
      Animated.spring(bottom, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
        friction: 6,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        setOpen(false);
      });
    }

    
scrollRef.current?.scrollTo({
  y: 400,
  animated: true,
});

  }, [open]);
  const scrollRef = useRef();


  
  function checkImage(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
     
      if (request.status == 200) //if(statusText == OK)
      {
        console.log("image exists");
       setCheckifexists('1');
      } else {
        console.log("image doesn't exist");
        setCheckifexists('0');
      }
    }
  }
  const [checkifexists,setCheckifexists] = useState('0');

  return (
    <>
      <SafeAreaView >
      
<View style={styles.aboutbutton} >
  
<TouchableOpacity style={{display:"flex",flexDirection:"row"}}>

<Image source={require('../../assets/guide.png')} style={{width:45,height:45}}/>
<Text style={{color:"#a8a8a8",marginLeft:'6%',alignSelf:"center"}}>Members{"\n"}Guide</Text>

</TouchableOpacity>
</View>
  </SafeAreaView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  dologout: () => dispatch(logout()),
});

const mapStateToProps = state => {
  return {
    logindata: state.loginreducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Aboutusbutton);
const styles = StyleSheet.create({
  buttonn:{

    position:"relative",
    
  },
    viewbutton:{
  display:"flex",
  flexDirection:"row",
  width:'90%',
  
  alignItems:"center"
  
    },
  textbutton:{
    justifyContent:"center",
    fontSize:15,
    fontWeight:"bold",
   
    width:'80%'
  },
  
    root:{
        position:"absolute",
        left:0,
        right:0,
        zIndex:100,
        backgroundColor:"#fff",
        borderTopLeftRadius : 8,
        borderTopRightRadius : 8,
        shadowColor :"#000",
        shadowOffset :{
            height:-3,
            width:0
        },
        shadowOpacity : 0.24,
        shadowRadius : 4,
        elevation:3,
        overflow:"hidden"
  
  
    },
    header:{
        height:40,
        backgroundColor:"#fff",
  
  
    },
    common:{
      shadowColor :"#000",
      shadowOffset :{
        
          width:0
      },
      shadowOpacity : 0.24,
      shadowRadius : 4,
    
     elevation:3
  
    },
    closeIcon:{
         position:"absolute",
         right:25 ,
         top:5,
         zIndex:10,
         color:"#072C78",height:30,width:50,textAlign:"center",
    },
    myinfocontainer:{
        width:wp("90%"),
       
        height:"auto",
        alignSelf:"center",
        borderRadius:15,
      
  
    },
    pfstyle:{
      flex: 1,
      width: '90%',
      height: '80%',
      resizeMode: 'contain',
      alignSelf:"center",
      borderRadius:150,
      
  
    }
  
    ,
  
    pfstyle2:{
      flex: 1,
      width: '10%',
      height: '160%',
      resizeMode: 'contain',
      alignSelf:"center",
      
      
     
  
    }
  
    ,
    pfstyle2image: {
      flex: 1,
      width: 120,
      height:40,
     
      borderRadius: 180,
  
      alignSelf: 'center',
    }
  
    ,
  
  
  
  
    pfcontainer:{
        width:wp('30%'),
        height:hp("20%"),
       
        alignSelf:"center",
        padding:hp("2%"),
        justifyContent:"center"
    },
    titletext:{
        margin:"3%",
        fontSize:18,
        color:"black"
    },
  
    containbuttons:{
      
     
      height:hp('18%'),
      position:'relative',
      width:'100%',
      display:'flex',
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center"
  },
  aboutbutton:{
      height:hp('10%'),
      width:wp('44%'),
      backgroundColor:"#F9F9F9",
      borderRadius:7,
      justifyContent:"center",
      alignItems:"center",
      shadowColor :"#536A9B",
      shadowOffset :{
          height:2,
          width:0
      },
      shadowOpacity : 1,
      shadowRadius : 4,
      elevation:5
  },
  emergencybutton:{
      height:hp('17%'),
      justifyContent:"center",
      width:wp('44%'),
      backgroundColor:"#093AA0",
      borderRadius:20,
      marginLeft:wp('4%'),
      alignItems:"center"
  
      
  },
  
  abouticon:{
      alignSelf:"center",
      width:50,
      height:50
  
  },
  textabout:{
      color:"#082D7B",
      alignSelf:"center",
      fontSize:14,
      fontWeight:"bold"
  },
  pfstyle2imageee: {
    flex: 1,
    width: '75%',
    height:'100%',
    resizeMode: 'cover',

    borderRadius: 250,

    alignSelf: 'center',
  },
  
});
