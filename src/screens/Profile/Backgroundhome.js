import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,Text,
  TouchableWithoutFeedback,Image,Easing
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { GradientHelper4 } from "./gradienthelper4";


const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper4);

export default class Animations4 extends Component {
  state = {
    animation: new Animated.Value(0),
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 3,
      duration: 1500,
      useNativeDriver:false
    }).start(() => {
      this.state.animation.setValue(0);
      this.startAnimation();
    });
  };

  componentDidMount (){
 Animated.loop(
       
         
    Animated.timing(this.state.animation, {
        toValue: 3,
        duration: 5000,
       useNativeDriver:false,
       easing: Easing.linear,
       
      })).start(() => {
        this.state.animation.setValue(0);
       
      });}


  render() {
    const colorInterpolate2 = this.state.animation.interpolate({
      inputRange: [0, 1,2,3],
      outputRange: ["#ECECEC", "#D3D3D3","#D0D0D0","#E2E2E2"],
    });

    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1,2,3],
      outputRange: ["#D3D3D3", "#6F6F6F","#929292","#A8A8A8"], });

    const animatedStyles = {
      backgroundColor: colorInterpolate,
    };
    return (
        <>
      

     <AnimatedGradientHelper
      
        color1={colorInterpolate}
        color2={colorInterpolate2}
        name={this.props.name}
      />


      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,
    borderRadius:50
  },
});