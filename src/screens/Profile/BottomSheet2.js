import React, { useEffect, useRef, useState } from 'react';
import { Dimensions ,StyleSheet ,Button ,Animated ,Text ,View } from 'react-native';
import {  Portal} from 'react-native-paper';
import  {PanGestureHandler} from 'react-native-gesture-handler'
import Myinformation from './Myinformation';

const BottomSheet2 = (props) => {
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

return (

<>


<Text>hiii</Text>
    <Button title="Press me" onPress = {() => setOpen(true)}></Button>
    <Text>{props.nametitle}</Text>
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

<Text style={styles.closeIcon} onPress = {()=> setOpen(false)}>Done</Text>

</View>
</PanGestureHandler>
<Myinformation></Myinformation>

</Animated.View>

 </Portal>
 
 </>
)
}

export default BottomSheet;
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