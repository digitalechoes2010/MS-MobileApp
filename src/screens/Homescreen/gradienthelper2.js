import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import {Image,StyleSheet} from 'react-native'

export class GradientHelper2 extends Component {
  render() {
    const {
      
      color1,
      color2,
    
    } = this.props;
    return (
    
<LinearGradient  start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}     colors={[color2, color1]} style={{height:37,
        flexDirection:"row",alignItems:"center",borderTopLeftRadius:20,
  borderTopRightRadius:20,marginBottom:-37}}>

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