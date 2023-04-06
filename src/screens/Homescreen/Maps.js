import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet ,Image,TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';


import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen'
 
   import { useNavigation } from '@react-navigation/native';

   import Gradientview from './Test';

export default function Maps(props) {
    const navigationscreen = useNavigation();

    return (
<>


<View style={styles.containmaps}>
   
    <View style={{display:"flex",flexDirection:"row",marginTop:'2.5%'}} >

    <Gradientview navv={navigationscreen}></Gradientview>


</View>


</View>

</>
    );

}




const styles = StyleSheet.create({
containmaps:{
    
   
    height:hp('13%'),
    position:'relative',
    width:'100%'
  
},
containmapinfo:{
    width:wp('23.5%') ,
    justifyContent:"center",
    alignItems:"center",
   

},
imagemap:{
    height:32,
    width:32,
    alignSelf:"center"
},
maptext:
{
alignSelf:"center",
fontSize:14,
color:"black"
}


});

