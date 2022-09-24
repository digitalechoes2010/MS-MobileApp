import React ,{useRef,useEffect,useState} from 'react';
import {ScrollView ,Text ,Animated ,Dimensions,StyleSheet,View,Image, Platform, PixelRatio} from 'react-native';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
import {Portal} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen';
   import { StatusBar } from 'expo-status-bar';
   import { FlatList } from 'react-native';

function Ourservices(props){
  const colors=[
    {
      name: '1. Physical Safety and Security',
      text :' - Static Guards\n - Executive Protection & Body Guards\n - Patrols\n - Special Events & Conference Security\n - Escort & Evacuations'
    },
    {
      name: '2. Infrastructural Security',
      text :' - Airport Security\n - Port Security\n - Oil Security\n - Gas Security'
  
    },
    {
      name: '3. Haulage Services',
      text :' - Cash Transportation (Cash in Transit)\n - Jewelry & Valuables Transportation'
  
    },
    {
      name: '4. Security Consulting and Management',
      text :' - Safety & Security Management Systems\n - Operations Room Support\n - Risk Assessments\n - Risk Analysis\n - Trainings\n - Logistics'
  
    },
    {
      name: '5. Engineering & Technology Services(ETS)',
      text :'Security Systems & Equipment\n\n - Intercom Systems\n - CCTV Systems\n - Fire Alarm Systems\n - Access Control Systems\n - Point Monitoring & Instrusion Systems\n - Parking Management System\n - Ticket Violation Management System \n - Intelligent Transportation System\n - Urban Traffic Control (UTC) Systems\n - Public Address & Evacuation System\n\n\n IT Security Services\n\n - Information & Communications Technology (ICT) Solutions\n - Cyber Security\n - Data Centers\n - Infrastructure Data & Cabling\n - Research & Development\n - Telecom Services\n'
  
    },
    
  ]
  
  const height=Dimensions.get('window').height
  
   
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
  
  const renderItem=({item})=>{
    return(

        <View style={{...styles.itemContainer,height:height}}>
          <Text style={[styles.text, {fontSize:normalize(12)}]}>{item.name}</Text>
          <Text style={[styles.textcolor, {fontSize:normalize(12)}]}>{item.text}</Text>
        </View>
       
  
    )
  }
  
  
  const renderFooter=()=>{
    return(
    <View style={{...styles.itemContainer,height:height,backgroundColor:'#228'}}>
      <Text style={styles.text}>End of the Line!</Text>
    </View>
    )
  }

    const bottomSheetHeight =Dimensions.get("window").height *0.9;
    const deviceWidth = Dimensions.get("window").width;
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
    const [open,setOpen] = useState(false);
    const onGesture = (event) =>{
    if(event.nativeEvent.translationY > 0){
    bottom.setValue(-event.nativeEvent.translationY)
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
    
    
    useEffect( () =>{
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
  

   <View style={styles.container}>
  
     <FlatList
   
     decelerationRate={'normal'} showsVerticalScrollIndicator={false} snapToInterval={height} snapToAlignment={'start'}
     data={colors} renderItem={renderItem} keyExtractor={item=>item.name} />
    </View>
  
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

     
      
      export default Ourservices;

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
        width: '90%',
        height: '20%',
        resizeMode: 'contain',
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
        fontSize:15
    },
    Ourservicescontainer:{
        width:'90%',
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        alignSelf:"center",
        marginTop:'10%'
    },
    container: {
        flex: 1
      },
    
      wrapper: {},
    
      slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
      },
    
      slide1: {
        flex: 1,
      
      },
    
      slide2: {
        flex: 1,
       
      },
    
      slide3: {
        flex: 1,
      
      },
    
      text: {
        color: '#093AA0',
        fontSize: 25,
        fontWeight: 'bold',textAlign:"center",paddingTop:'5%'
      },
    
      image: {
        width,
        flex: 1
      }
      ,
      textcolor:{
          color:"black",
          fontSize:15,marginTop:"10%",
          marginHorizontal: '2.5%'
      },
      textcolor2:{
        color:"black",
        fontSize:15,marginTop:"2%"
    },
    container: {
      flex:1,

  },

  itemContainer:{
   
  },
  
  })