import React ,{useRef,useEffect,useState} from 'react';
import {ScrollView ,Text ,Animated ,Dimensions ,StyleSheet,View,TouchableOpacity, Platform, PixelRatio} from 'react-native';
import {Portal,List} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';
import ProfileDashboard from './ProfileDashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import Listassessment from './Risknews';
import Riskmap from './Riskmap';
import Metrolocation from './Metrolocation';
import Messageceo from '../content/Messageceo';
import Whoweare from '../content/Whoweare';
import Ourservices from '../content/Ourservices';
import Securityforces from '../content/Securityforces';
import Securitysituation from '../content/Securitysituation';
import Icoca from '../content/Icoca';

import Lebanonfacts from '../content/Lebanonfacts';
import Considerations from '../content/Considerations';
import Checklist from '../content/Checklist'

function Myinformation(props){
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
        

        <List.Item key={props.nametitle} style={{backgroundColor:"#093A9E",borderTopRightRadius: props.border1 == 20 ? 20 : 0,
        borderTopLeftRadius: props.border2 == 20 ? 20 : 0,borderBottomRightRadius: props.border3 == 20 ? 20 : 0,
        borderBottomLeftRadius: props.border4 == 20 ? 20 : 0}}   onPress = {() => setOpen(true)}
            
            title={() => ( <Text style={{color:"white", fontSize:normalize(12)}}>{props.nametitle}</Text> )}

          
            right={() => 

                <Icon name="chevron-right" size={normalize(12)} color="white"  style={{alignSelf:"center",right:10}}
             
/>
                
             } 
       
         />
  
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

<View style={{padding: '1%', width: '100%', flexDirection:"row"}} >
     
<TouchableOpacity  style={{borderRadius:20,backgroundColor:"#082D7B",alignItems: 'center', justifyContent: 'space-between', flexDirection:"row", paddingHorizontal: '2%', marginVertical: '2%', marginLeft: '2%'}} onPress = {()=> setOpen(false)}>
  <Icon name="chevron-left" size={normalize(8)} color="white" style={{justifyContent:"center",alignSelf:"center"}}  />
<Text   style={{fontSize:normalize(12),justifyContent:"center",alignSelf:"center",color:"white", marginLeft: '1%'}}>Profile</Text>
</TouchableOpacity>
      </View>
</View>
</PanGestureHandler>

{
props.nametitle == "My Information" ? <><ProfileDashboard></ProfileDashboard></> :
 props.nametitle =="National Risk Assessment" ? <><Listassessment></Listassessment></>:
props.nametitle =="National Risk Zone Map" ? <><Riskmap></Riskmap></>:
props.nametitle =="Visit Our Office" ? <><Metrolocation></Metrolocation></>:
props.nametitle =="Message From Our CEO" ? <><Messageceo></Messageceo></>:
props.nametitle =="Who We Are" ? <><Whoweare></Whoweare></>:
props.nametitle =="Our Services" ? <><Ourservices></Ourservices></>:
props.nametitle =="Lebanon Facts and Figures" ? <><Lebanonfacts></Lebanonfacts></>:
props.nametitle =="Considerations Before Departure" ? <><Considerations></Considerations></>:
props.nametitle =="Checklist Before Departure" ? <><Checklist></Checklist></>:
props.nametitle =="Security Situation" ? <><Securitysituation></Securitysituation></>:
props.nametitle =="Security Forces" ? <><Securityforces></Securityforces></>:
props.nametitle =="ISO & ICoCA Affiliate" ? <><Icoca></Icoca></>:

null


}

</Animated.View>

 </Portal>


        </>


    )};

export default Myinformation;

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
        // height:40,
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
    }
  })