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
<Text style={{color:"black",textAlign:"left",fontSize:normalize(12)}}>
Most stable in 50 years {"\n"}
</Text>
<Text  style={{color:"black",textAlign:"justify", fontSize:normalize(12)}}>
Lebanon has therefore been gradually and continually stabilising since early 2015, reaching a level of
stability not seen for nearly so years. There have been no major successful terrorist incidents since
November 12th 2015, although the bungled Islamic State operation in al-Qaa in June 2016 and several
foiled attacks since then testify to a low but real residual risk. Similarly, from 2014-18 kidnappings in
Lebanon have gone from an average rate of one per week to around one per month, and with far
fewer high-profile cases. Militia clashes have been largely eliminated in all areas outside the
Palestinian camps, and even there they have become increasingly rare. However, casualties relating
to minor shootings, personal disputes, raids by security forces, and celebratory gunfire remain
common across the country. The Lebanese government has taken several steps to curb the problem
of gun violence, including cancelling arms licenses and raising the criminal punishment for
unsanctioned shooting, but small arms fire continues to occur on a near-daily basis, especially in
marginalised urban areas and rural districts. Minor shootings have killed or injured scores of
civilians over the past two years alone, including many innocent bystanders caught at the wrong
place in the wrong time.{"\n"}{"\n"}
</Text>
<Text style={{color:"black",textAlign:"left",fontSize:normalize(12)}}>
Remaining threats {"\n"}
</Text>
<Text  style={{color:"black",textAlign:"justify", fontSize:normalize(12)}}>
In the current context various types of civil unrest such as demonstrations and roadblocks are the
most common security incidents in Lebanon. Civil unrest has not witnessed the same overall
decline as other security incident types and continues to occur on a near-daily basis, fuelled
primarily by continually deteriorating livelihood conditions reflecting a range of issues, including
stagnating or unpaid public sector salaries, tax hikes, rising housing rents, the garbage crisis, and
recurrent electricity cuts. Since April 2017 more than 300 individual protests and road blocks have
been reported across the country, overwhelmingly taking place in squares in major cities and in
many key traffic junctions as activists seek to maximise exposure and disruptive impact on traffic.
However, the most violent manifestations have been largely brought to a halt after the 2015 'You
Stink' protests that led to widespread vandalism in downtown Beirut and clashes between activists
and security forces. Apart from demonstrations organised by political parties and/or with a politicosectarian
dimension, most acts of civil unrest are therefore now announced, short-lived, and
generally peaceful. However, as a minor riot in Hamra in late December 2018 indicates, this peaceful
pattern of demonstrations could easily change in 2019 if general socio-economic hardship continues
to worsen.{"\n"}{"\n"}
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