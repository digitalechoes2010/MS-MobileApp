
import React from "react";
import { Component } from "react";
import {Animated,View,Text,StyleSheet} from 'react-native'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen'
  

class Shake extends Component{

    constructor(props) {
        super(props)
        this.shakeAnimation = new Animated.Value(0);
      };
    componentDidMount(){
        Animated.loop(
   Animated.sequence([
          Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
        ])).start();
     }

     render(){
         return (
    
     <Animated.View style={[{ transform: [{translateX: this.shakeAnimation}]},styles.view1]}>  
    
     </Animated.View>
         )}
        
}
export default Shake;


const styles = StyleSheet.create({

    
view1:{
    height:hp('13%'),
    width:wp('90%'),
    backgroundColor:"#F9F9F9",
    borderRadius:20,
    zIndex: 5,
    justifyContent:"center",
    alignItems:"center",
    shadowOffset :{
      height:2,
      width:0
  },
  shadowOpacity : 1,
  shadowRadius : 4,
  elevation:5,position:"absolute",marginTop:20

    
        },
})