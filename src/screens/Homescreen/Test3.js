import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,Text,
  TouchableWithoutFeedback,Image
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { GradientHelper3 } from "./gradienthelper3";


const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper3);

export default class Animations3 extends Component {
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
        Animated.sequence([
         
    Animated.timing(this.state.animation, {
        toValue: 3,
        duration: 1000,
       useNativeDriver:false,
       delay:4000
      })])).start(() => {
        this.state.animation.setValue(0);
       
      });}


  render() {
    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1,2],
      outputRange: ["#18A0EB", "#3FA8F0","#18A0EB"],
    });

    const colorInterpolate2 = this.state.animation.interpolate({
        inputRange: [0, 1,2],
        outputRange:["#4C4BC1", "#A8AEF6","#4C4BC1"],
      });

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