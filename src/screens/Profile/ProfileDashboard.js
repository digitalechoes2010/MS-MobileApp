import React ,{useRef,useEffect,useState} from 'react';
import {ScrollView ,Text ,Animated ,Dimensions,StyleSheet,View,Image, PixelRatio, Platform} from 'react-native';
import {Portal} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen';
import { connect } from "react-redux";

function ProfileDashboard(props){
    const bottomSheetHeight =Dimensions.get("window").height *0.9;
    const deviceWidth = Dimensions.get("window").width;
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
    const [open,setOpen] = useState(false);
    const onGesture = (event) =>{
    if(event.nativeEvent.translationY > 0){
    bottom.setValue(-event.nativeEvent.translationY)
    }
    }
    
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
    
    const onGestureEnd = (event) =>{
        if(event.nativeEvent.translationY > bottomSheetHeight /2 ){
            setOpen(false);
            }
            else{
                bottom.setValue(0);
            }
    }
    
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
    
    
    
    
    useEffect( () =>{
        


 if(props.logindata.isLoggedIn == true){
    checkImage('https://echoes.agency/files/'+props.logindata.userData.email+'.png');}
  
    if(open){
        setOpen(open);
        Animated.timing(bottom ,{
            toValue:0,
            duration: 500,
            useNativeDriver:false
        }).start();
      
    
    }
    else{
        Animated.timing(bottom ,{
            toValue:-bottomSheetHeight,
            duration: 500,
            useNativeDriver:false
        }).start( () =>{
            setOpen(false);
        });
        
      
    
    
    }
    
    }, [open]);
    
    return(
        <>
  



       <ScrollView>

<View style={styles.myinfocontainer}>

<View style={styles.pfcontainer}>

  {props.logindata.isLoggedIn == true ?
             checkifexists == '1' ? 
                <Image
              style={styles.pfstyle}
             
              source={{uri:'https://echoes.agency/files/'+props.logindata.userData.email+'.png' }}
            />
             :
             <Image
              style={styles.pfstyle}
             
              source={require('../../assets/defaultpf.png')}
            />
:null
           }

</View>


<Text style={[styles.titletext, {fontSize:normalize(12)}]}>FULL NAME</Text>
{ props.logindata.isLoggedIn == true ? <Text style={[styles.textstyle, {fontSize:normalize(12)}]}>{props.logindata.userData.username}</Text> : null }

<View  style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",marginTop:"2.5%"  }}
      />



<Text style={[styles.titletext, {fontSize:normalize(12)}]}>EMAIL</Text>
{ props.logindata.isLoggedIn == true ? <Text style={[styles.textstyle, {fontSize:normalize(12)}]}>{props.logindata.userData.email}</Text> : null }

<View  style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",marginTop:"2.5%"   }}
      />


<Text style={[styles.titletext, {fontSize:normalize(12)}]}>PHONE NUMBER</Text>
{ props.logindata.isLoggedIn == true ? <Text style={[styles.textstyle, {fontSize:normalize(12)}]}>{props.logindata.userData.phonenumber}</Text> : null }

<View  style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE", marginTop:"2.5%"  }}
      />


<Text style={[styles.titletext, {fontSize:normalize(12)}]}>PRIMARY LOCATION</Text>
{ props.logindata.isLoggedIn == true ? <Text style={[styles.textstyle, {fontSize:normalize(12)}]}>{props.logindata.userData.location}</Text> : null }

<View  style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",marginTop:"2.5%"   }}
      />


<Text style={[styles.titletext, {fontSize:normalize(12)}]}>DESCRIPTION</Text>
{ props.logindata.isLoggedIn == true ? <Text style={[styles.textstyle, {fontSize:normalize(12)}]}>{props.logindata.userData.description}</Text> : null }

<View  style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",marginTop:"2.5%"   }}
      />

</View>
</ScrollView>
  
 <Portal>
   
<Animated.View style={[styles.root ,{  bottom : bottom , height : bottomSheetHeight,
shadowOffset:{
    height:-3 
}
},styles.common ]}>

<PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>


<View style={[styles.header,styles.common , { shadowOffset :{ height:3 }}]}>
<View style={{width:60 , position :"absolute" , top: 8 , left: (deviceWidth - 60)/2 ,
zIndex:10 ,height:3 ,borderRadius :1.5 ,backgroundColor: "#ccc"


}} />

</View>
</PanGestureHandler>


</Animated.View>

 </Portal>


        </>


    )};

      const mapStateToProps = (state) =>{
      return  {
        logindata : state.loginreducer
      }
        
      }
      
      export default connect (mapStateToProps ,null)(ProfileDashboard)

const styles = StyleSheet.create({
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
         right:8 ,
         top:0,
         zIndex:10
    },
    pfstyle:{
        flex: 1,
        width: 120,
        height: '20%',
       
        alignSelf:"center",
        borderRadius:150
    
      }
    
      ,
      pfcontainer:{
          width:wp('30%'),
          height:hp("20%"),
         
          alignSelf:"center",
          padding:hp("2%"),
          justifyContent:"center"
      },
      myinfocontainer:{
        width:wp("85%"),
       
        height:"auto",
        alignSelf:"center",
        borderRadius:15
  
    },
    titletext:{

        color:"#5D729B",
        fontSize:15,
        marginTop:'2%',
        fontWeight:"bold"
    },
    textstyle:{
        marginTop:'2%',
        fontSize:15,color:"black"
    }
  })