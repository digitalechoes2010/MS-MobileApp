import React ,{useRef,useEffect,useState} from 'react';
import {Text ,Animated ,Dimensions ,StyleSheet,View,Image} from 'react-native';
import {Portal,List} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';


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
        

        <List.Item onPress = {() => setOpen(true)}  
            
             title={({ size, color }) => ( <Text style={{color:"black"}}>{props.title}</Text> )}

            description={({ size, color }) => ( <>
            <View style={{display:"flex",flexDirection:'row'}}>
            <Image style={{alignItems:"center",alignSelf:"center"}}
                source={
                    props.risklevel == "Normal" ? require('../../assets/greenalert.png') :
                    props.risklevel == "High" ? require('../../assets/redalert.png') :
                    props.risklevel == "Medium" ? require('../../assets/yellowalert.png') :
                    null
                   } 
                    
                    />  
            <Text style={{color:"black"}} >  Risk:{props.risklevel}</Text>
            </View>
            </>) }
           
            right={props => <List.Icon { ...props} color="white" style={{alignSelf:"center"}}  icon={({ size, color }) => (
            
                <Icon name="chevron-right" size={16} color="#093A9E" 
                style={{justifyContent:"center",alignSelf:"center",alignContent:"center",alignItems:"center"}}  />

                
              )} />}
        
          />
           <View  
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
            
            }}
          />
        
            
 <Portal >
   
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

<View style={{justifyContent:"center",height:50,backgroundColor:"white",alignSelf:"center",width:'100%',display:"flex",flexDirection:"row"}} >
      <View  style={{borderRadius:20,marginLeft:'3%',padding:5,backgroundColor:"#082D7B",alignContent:"center",alignSelf:"center",position:"absolute",left:0,display:"flex",flexDirection:"row"}}>
      <Icon name="chevron-left" size={14} color="white" style={{justifyContent:"center",alignSelf:"center"}}  />
<Text  onPress = {()=> setOpen(false)}  style={{fontSize:13,justifyContent:"center",alignSelf:"center",color:"white"}}>National News</Text>
    </View>
    
         <View style={{alignSelf:"center",justifyContent:"center",display:"flex",flexDirection:"row"}}  >
         <Text style={{fontSize:17,alignSelf:"center",alignContent:"center",alignItems:"center",textAlign:"center",color:"black"}}>{props.title}</Text>
            </View>
        </View>





</View>
</PanGestureHandler>

<Text style={{marginTop:'5%',color:"black",color:"black"}}>{props.title}</Text>
<Text style={{marginTop:'5%',color:"black",paddingLeft:'4%',textAlign:"justify",paddingRight:'4%'}}>{props.description}</Text>

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
    }
  })