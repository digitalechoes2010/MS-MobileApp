import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import {Image,StyleSheet} from 'react-native'

export class GradientHelper4 extends Component {
  render() {
    const {
      
      color1,
      color2,
    
    } = this.props;
    return (
    
<LinearGradient  start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}     colors={[color2, color1]} style={{flex:1,
            
          
          }}>

        </LinearGradient>
    );
  }
}



const styles = StyleSheet.create({
    imagemap:{
        height:32,
        width:32,
        alignSelf:"center"
    },
}
)