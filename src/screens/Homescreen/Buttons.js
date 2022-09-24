import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet ,SafeAreaView, ScrollView,Dimensions,Image,FlatList,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen'
 
   import { useNavigation } from '@react-navigation/native';

export default function Buttons(props) {
    const navigationscreen = useNavigation();

    return (
<>

<View style={styles.containbuttons}>
<SafeAreaView >
      
      <View style={styles.aboutbutton} >
        
      <TouchableOpacity   onPress = {() => props.updateyes}  style={{display:"flex",flexDirection:"row"}}>
      
      <Image source={require('../../assets/guide.png')} style={{width:45,height:45}}/>
      <Text style={{color:"#a8a8a8",marginLeft:'6%',alignSelf:"center"}}>Members{"\n"}Guide</Text>
      
      </TouchableOpacity>
      </View>
        </SafeAreaView>
<View style={styles.emergencybutton}>
<TouchableOpacity onPress={() =>    navigationscreen.navigate('Emergency')} style={{display:"flex",flexDirection:"row"}}>

<Image source={require('../../assets/mobile.png')} style={{width:26,height:47}}/>
<Text style={{color:"#a8a8a8",marginLeft:'6%',alignSelf:"center"}}>Emergency{"\n"}Numbers</Text>

</TouchableOpacity>
</View>

</View>
</>
    );

}




const styles = StyleSheet.create({
containbuttons:{
    
   
    height:hp('15%'),
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
    height:hp('10%'),
    justifyContent:"center",
    width:wp('44%'),
    backgroundColor:"#F9F9F9",
    borderRadius:7,
    marginLeft:wp('4%'),
    alignItems:"center",
    shadowColor :"#536A9B",
    shadowOffset :{
        height:2,
        width:0
    },
    shadowOpacity : 1,
    shadowRadius : 4,
    elevation:5,

    
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


});

