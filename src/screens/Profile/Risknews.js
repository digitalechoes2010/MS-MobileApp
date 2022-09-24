import React ,{useRef,useEffect,useState} from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { getrisknews } from '../../redux/actions';
import Assessmentlist from './Assessmentlist';

import {Text ,Animated ,Dimensions ,StyleSheet,View,Image,Button,FlatList,Pressable,TouchableOpacity, Platform, PixelRatio} from 'react-native';
import {Portal,List} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import Foundation from 'react-native-vector-icons/Foundation';

 function Risknewss(props) {
  const  {risknews} = useSelector (state =>state.userReducer);
  const dispatch = useDispatch();

  const bottomSheetHeight =Dimensions.get("window").height *0.9;
  const deviceWidth = Dimensions.get("window").width;
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
  const [open,setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const navigationscreen=useNavigation();
  
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
  
  

    const renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
            
            }}
          />
        );
      };
      useEffect(() => {
        dispatch(getrisknews());
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


      },[open]);

      const doclosefunction = () =>{
        setModalVisible(!modalVisible);
        setTimeout(() => {
          navigationscreen.navigate('Login',{yess:"0"})},1000)
      }
    return (
        <>

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
         <Image source={require("../../assets/alert4.png")} style={{width:80,height:73}}/>
       <Text style={[styles.modalText, {fontSize:normalize(12)}]}>Please login to see the info</Text>
       <Text
                style={styles.buttonnn}
                onPress={doclosefunction}>
                Login
              </Text>
              <Text
                style={styles.buttonnn}
                onPress={() => 
              
                setModalVisible(!modalVisible)}>
                Cancel
              </Text>

     </View>
   </Pressable>

 </Modal>

        <View style={{padding:'5%',height:'95%'}}>

         
          <FlatList   data={risknews} style={{height:'90%'}} keyExtractor={item => item.id}
            
            renderItem={({ item }) => (
     <>
    
    <List.Item onPress = {() => 
       props.logindata.isLoggedIn == false ? setModalVisible(true) :
    setOpen(true)}  
            
            title={({ size, color }) => ( <Text style={{color:"black", fontSize:normalize(12)}}>{item.title}</Text> )}

           description={({ size, color }) => ( <>
           <View style={{display:"flex",flexDirection:'row', alignItems: "center"}}>
           {
item.risklevel == "Normal"  ?  <Foundation name="alert" size={normalize(12)} color="#32CD32" style={{marginRight: '2%'}}/>  :
item.risklevel == "High" ?  <Foundation name="alert" size={normalize(12)} color="#ff2a00" style={{marginRight: '2%'}}/> :
item.risklevel == "Medium"   ?  <Foundation name="alert" size={normalize(12)} color="#ff0" style={{marginRight: '2%'}}/> : 
null
}
           <Text style={{color:"black", fontSize:normalize(12)}} >Risk: {item.risklevel}</Text>
           </View>
           </>) }
          
           right={item => <List.Icon  color="white" style={{alignSelf:"center"}}  icon={({ size, color }) => (
           
               <Icon name="chevron-right" size={normalize(12)} color="#093A9E" 
               style={{justifyContent:"center",alignSelf:"center",alignContent:"center",alignItems:"center"}}  />

               
             )} />}
       
         />
          <View  
           style={{
             height: 1,
             width: "100%",
             backgroundColor: "#CED0CE",
           
           }}
         />
       
           
<Portal >
  
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

<View style={{width: '100%', flexDirection:"row"}} >
     
<TouchableOpacity  style={{borderRadius:20,backgroundColor:"#082D7B",alignItems: 'center', justifyContent: 'space-between', flexDirection:"row", paddingHorizontal: '2%', marginVertical: '2%', marginLeft: '2%'}} onPress = {()=> setOpen(false)}>
  <Icon name="chevron-left" size={normalize(8)} color="white" style={{justifyContent:"center",alignSelf:"center"}}  />
<Text   style={{fontSize:normalize(12),justifyContent:"center",alignSelf:"center",color:"white", marginLeft: '1%'}}>National News</Text>
</TouchableOpacity>
      </View>


</View>
</PanGestureHandler>

<Text style={{marginTop:'5%',color:"black",alignSelf:"center", fontSize:normalize(12)}}>{item.title}</Text>
<Text style={{marginTop:'5%',color:"black",paddingHorizontal:'4%',textAlign:"justify",fontSize:normalize(12)}}>{item.description}</Text>


</Animated.View>

</Portal>


    
     </>
     )}
     
     />
        
</View>
 </>
    )
}

const mapStateToProps = (state) =>{
  return  {
    logindata : state.loginreducer
  }
    
  }
  
  export default connect (mapStateToProps ,null)(Risknewss)


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
      // height:40,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",marginTop:15,color:"black"
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
  buttonnn: {
    fontSize: 20,
    color: 'white',
    width: 100,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#1F3E80',
    padding: 8,
    textAlign: 'center',
  },
})