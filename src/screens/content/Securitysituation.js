import React ,{useRef,useEffect,useState} from 'react';
import {ScrollView ,Text ,Animated ,Dimensions,StyleSheet,View,Image, Platform, PixelRatio} from 'react-native';
import {Portal} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen';


function Securitysituation(props){
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
  



       <ScrollView>
           <View style={styles.messageceocontainer}>
               <Text style={{fontSize:normalize(12),color:"black"}}>The Security Situation</Text>
   
<View  style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",marginTop:"2.5%"  }}
      />
            
<Text style={{color:"black",textAlign:"left",fontSize:normalize(12)}}>
{"\n"}
The 2012-2015 Escalations{"\n"}
</Text>
<Text style={{color:"black",textAlign:"justify", fontSize:normalize(12)}}>
Lebanon is now more stable than at any other time in half a century. The current extraordinary stability contrasts dramatically to the 2012-15 period when political, sectarian, economic and security spill-over from the conflict in Syria brought Lebanon to the brink of another civil war. During the 2013-14 peak of violence, the security situation saw major terrorist attacks on a monthly basis, while kidnappings and inter-militia clashes were weekly occurrences. The foreign terrorist groups Jabhat al-Nusra and Islamic State invaded and occupied Lebanese territory in the north-eastern part of the Bekaa Valley and established local branches and/or Lebanese proxies/subsidiaries in Tripoli, Beirut and Saida. Due to the paralysis in the presidency and the parliament as well as 10 months with a caretaker government and a dearth of moderate sunni leadership to counter-balance the extremist winds emanating from the jihad in Syria, state security institutions were initially incapable of effectively handling the widening chaos.
{"\n"}{"\n"}</Text>
<Text style={{color:"black",textAlign:"left",fontSize:normalize(12)}}>
Coming Back From The Brink {"\n"}
</Text>
<Text  style={{color:"black",textAlign:"justify", fontSize:normalize(12)}}>
But through a rare level of cooperation, Lebanese leaders and their international allies brought the country back from the brink. The 2013-14 peak of instability galvanised a political consensus on the need to avoid a national catastrophe and led to the formation of the Tammam Salam cabinet in February 2014. This paved the way for historically unprecedented counter-terrorism cooperation between Lebanon’s security and intelligence forces, traditionally divided by inter-agency rivalries mirroring the preferences of their patron political/sectarian elites. The rare inter-agency security cooperation was encouraged and supported by mainly western states contributing with intelligence, technical assistance, hardware and funding to the ISF, General Security and Lebanese Armed Forces (LAF). This included the notable formation of Lebanon’s first ever proper border regiments tasked with controlling a porous eastern border open to human smugglers, terrorist infiltrators, arms traffickers etc. Parallel to the domestic and foreign support for the formal security forces, the national political consensus led power brokers to lift political cover and protection from destabilizing elements such as Tripolitan militia leaders, extremist religious figures inciting sectarian violence, as well as armed clans and organized crime groups in the Bekaa Valley. Finally, Lebanon’s domestic security also benefited from the Syrian army and Hezbollah taking control of most of the eastern border on the Syrian side from various rebel groups over the course of 2013 and 2014 as well as Hezbollah and the Lebanese army’s complete elimination of the terrorist presence in the north-east Bekaa in the summer of 2017. 
{"\n"}{"\n"}
</Text>
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

     
      
      export default Securitysituation;

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
    messageceocontainer:{
        width:'90%',
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        alignSelf:"center",
        marginTop:'10%'
    }
  })