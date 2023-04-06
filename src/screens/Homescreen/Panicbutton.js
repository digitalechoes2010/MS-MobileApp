import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet ,Image,TouchableWithoutFeedback,Pressable, Dimensions, PixelRatio, Platform, TouchableOpacity} from 'react-native'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen'
  
   import { useNavigation } from '@react-navigation/native';
   import { connect } from "react-redux";
   import Modal from 'react-native-modal';
   import * as Animatable from 'react-native-animatable';


 function Panicbutton(props) {
    const navigationscreen = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    return (
<>



<View style={styles.containpanicbutton}>

  <Modal
   
        isVisible={modalVisible}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>

<Pressable style={styles.centeredView}  onPress={() => setModalVisible(!modalVisible)}>
       
          <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{alignSelf:"flex-end"}}>
            <Text style={{fontSize:normalize(12), color:"black", fontWeight:"bold"}}>X</Text>
          </TouchableOpacity>
              <Image source={require("../../assets/alert4.png")} style={{width:normalize(20), height: normalize(20)}} resizeMode="contain"/>
            <Text style={[styles.modalText, {fontSize:normalize(12)}]}>Alert! Panic button unavailable. Your current plan does not support this feature. Please contact {"\n"} +961 1 999 966</Text>
            
          </View>
        </Pressable>
     
      </Modal>



      <Modal
   
   isVisible={modalVisible2}
   backdropColor="#B4B3DB"
   backdropOpacity={0.8}
   animationIn="zoomInDown"
   animationOut="zoomOutUp"
   animationInTiming={600}
   animationOutTiming={600}
   backdropTransitionInTiming={600}
   backdropTransitionOutTiming={600}>

<Pressable style={styles.centeredView}  onPress={() => setModalVisible2(!modalVisible2)}>
  
     <View style={styles.modalView}>
     <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{alignSelf:"flex-end"}}>
            <Text style={{fontSize:normalize(12), color:"black", fontWeight:"bold"}}>X</Text>
          </TouchableOpacity>
         <Image source={require("../../assets/alert4.png")} style={{width:normalize(20), height: normalize(20)}}/>
       <Text style={[styles.modalText, {fontSize: normalize(12)}]}>Alert! Panic button unavailable.
You should log in</Text>
       
     </View>
   </Pressable>

 </Modal>

    

{

props.logindata.isLoggedIn == false ?

<TouchableWithoutFeedback   onPress={() => setTimeout(() => {
    setModalVisible2(true)
},2000)
  }>
<Animatable.View animation="slideInLeft"
      delay={1000}
      useNativeDriver={true} style={styles.view11}>
<Image source={ require('../../assets/Panicbutton.png')} style={styles.abouticon}   />

<Text style={{fontSize:normalize(12),color:"#a80505"}}>Panic Button</Text>
<Text style={[styles.textsos2, {fontSize:normalize(12)}]}>Press for 2 seconds</Text>
</Animatable.View>
</TouchableWithoutFeedback>

:

props.logindata.userData.typeaccount == "access" ? <> 


    <TouchableWithoutFeedback onPress = {() =>   setTimeout(() => {  navigationscreen.navigate('Panicbutton',
    {unit:props.unit,division:props.division,name:props.name})},2000)}>
<Animatable.View animation="slideInLeft"
      delay={1000}
      useNativeDriver={true} style={styles.view1}>
<Image source={ require('../../assets/Panicbutton.png')} style={styles.abouticon}   />

<Text style={{fontSize:normalize(12),color:"#a80505"}}>Panic Button</Text>
<Text style={[styles.textsos2, {fontSize:normalize(12)}]}>Press for 2 seconds</Text>

</Animatable.View>
</TouchableWithoutFeedback>
</> : <>


<TouchableWithoutFeedback   onPress={() => setTimeout(() => { setModalVisible(true)},2000)}>
<Animatable.View animation="slideInLeft"
      delay={1000}
      useNativeDriver={true} style={styles.view11}>
<Image source={ require('../../assets/Panicbutton.png')} style={styles.abouticon}   />

<Text style={{fontSize:normalize(12),color:"#a80505"}}>Panic Button</Text>
<Text style={[styles.textsos2, {fontSize:normalize(12)}]}>Press for 2 seconds</Text>

</Animatable.View>
</TouchableWithoutFeedback>
</>}


</View>
</>
    );

}

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const mapStateToProps = (state) =>{
    return  {
      logindata : state.loginreducer
    }
      
    }
    
    export default connect (mapStateToProps ,null)(Panicbutton)


const styles = StyleSheet.create({
    containpanicbutton:{
   
 
    height:hp('25%'),
    position:'relative',
    width:'100%',marginTop:'0.5%'
    
   
},
view1:{
    height:hp('15%'),
    width: '100%',
    backgroundColor:"#F9F9F9",
    borderRadius:20,
    zIndex: 5,
    justifyContent:"center",
    alignItems:"center",
    shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            
            elevation: 6,

    
        },

        view11:{
            height:hp('15%'),
            width: '100%',
            backgroundColor:"grey",
            borderRadius:8,
            zIndex: 5,
            justifyContent:"center",
            alignItems:"center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            
            elevation: 6,
            
                },
        view2:{
            height:hp('10%'),
            width: '100%',
            backgroundColor:"#093AA0",
            borderRadius:20,
            opacity: 0.5,
            alignSelf:"center",
            marginTop:hp('-9%'),zIndex:-1
        },
        view3:{
            height:hp('10%'),
            width: '100%',
            backgroundColor:"#093AA0",
            borderRadius:20,
            opacity: 0.3,
            alignSelf:"center",
            marginTop:hp('-9%'),zIndex:-1
        },

        textsos2:{


            fontSize:14,
            color:"#a8a8a8",
            alignSelf:"center",
            alignItems:"center"
        },
        abouticon:{
            width:50,
            height:50
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,zIndex:1,
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
          },
          buttonOpen: {
            backgroundColor: "#F194FF",
          },
          buttonClose: {
            backgroundColor: "#2196F3",
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center",marginTop:15,color:"black"
          }
        
});

