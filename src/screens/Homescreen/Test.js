import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,Text,
  TouchableWithoutFeedback,Image,TouchableOpacity
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { GradientHelper } from "./gradient-helper";
import { useNavigation } from '@react-navigation/native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen'

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

export default class Animations extends Component {
  constructor(props) {
    super(props);
  this.state = {
    animation: new Animated.Value(0),
    animation1: new Animated.Value(0),
    animation2: new Animated.Value(0),
    animation3: new Animated.Value(0),
  };
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;     //<--------Set allowFontScaling false for Screen


}
  

  componentDidMount (){
 Animated.loop(
        Animated.sequence([
         
    Animated.timing(this.state.animation, {
        toValue: 3,
        duration: 1000,

        useNativeDriver:false
     }) , Animated.timing(this.state.animation1, {
        toValue: 3,
        duration: 1000,useNativeDriver:false
       }), Animated.timing(this.state.animation2, {
        toValue: 3,
        duration: 1000,useNativeDriver:false }),  Animated.timing(this.state.animation3, {
        toValue: 3,
        duration: 1000,useNativeDriver:false
      
     
      }) 
    ])).start(() => {
        this.state.animation.setValue(0)
        this.state.animation1.setValue(0)
        this.state.animation2.setValue(0)
        this.state.animation3.setValue(0)
       
      });}


  render() {
    
    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1,2],
      outputRange: ["#a80505", "#a80505","#a80505"],
    });

    const colorInterpolate2 = this.state.animation.interpolate({
        inputRange: [0, 1,2],
        outputRange:["#a80505", "#a80505","#a80505"],
      });

      const colorInterpolate3 = this.state.animation1.interpolate({
        inputRange: [0, 1,2],
        outputRange: ["#f90d0d", "#f90d0d","#f90d0d"],
      });
  
      const colorInterpolate4 = this.state.animation1.interpolate({
          inputRange: [0, 1,2],
          outputRange:["#f90d0d", "#f90d0d","#f90d0d"],
        });
  
   const colorInterpolate5 = this.state.animation2.interpolate({
        inputRange: [0, 1,2],
        outputRange: ["#78a3ef", "#78a3ef","#78a3ef"],
      });
  
      const colorInterpolate6 = this.state.animation2.interpolate({
          inputRange: [0, 1,2],
          outputRange:["#78a3ef", "#78a3ef","#78a3ef"],
        });

   const colorInterpolate7 = this.state.animation3.interpolate({
        inputRange: [0, 1,2],
        outputRange: ["#11366d", "#11366d","#11366d"],
      });
  
      const colorInterpolate8 = this.state.animation3.interpolate({
          inputRange: [0, 1,2],
          outputRange:["#11366d", "#11366d","#11366d"],
        });
        const { navigation } = this.props;
       

    return (

        <>
      

<TouchableOpacity onPress={() =>this.props.navv.navigate('Nationalmap')}>
<View  style={styles.containmapinfo}>

  <AnimatedGradientHelper
      
        color1={colorInterpolate}
        color2={colorInterpolate2}
    name="National"
      />


<Text style={styles.maptext}>National{"\n"}Risk</Text>
</View></TouchableOpacity>
<TouchableOpacity onPress={() =>    this.props.navv.navigate('Hospitalmap')}>
<View style={styles.containmapinfo}>

 <AnimatedGradientHelper
      
        color1={colorInterpolate3}
        color2={colorInterpolate4}
 name="Hospital"
      />

<Text style={styles.maptext}>Hospitals</Text>
</View></TouchableOpacity>

<TouchableOpacity onPress={() =>   this.props.navv.navigate('Embassiesmap')}>
<View  style={styles.containmapinfo}>

 <AnimatedGradientHelper
      
        color1={colorInterpolate5}
        color2={colorInterpolate6}
name="Embassies"
      />

<Text style={styles.maptext}>Embassies</Text>
</View></TouchableOpacity>

<TouchableOpacity onPress={() => this.props.navv.navigate('Policemap')}>
     <View  style={styles.containmapinfo}>

 <AnimatedGradientHelper
      
        color1={colorInterpolate7}
        color2={colorInterpolate8}
name="Police"
      />

<Text style={styles.maptext}>Police{"\n"}Stations</Text>
</View>
</TouchableOpacity>





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
color:"black",textAlign:"center"
}

});