import React ,{useRef,useEffect,useState} from 'react';
import {Text ,Animated ,Dimensions ,StyleSheet,View,Image,Pressable,TouchableOpacity} from 'react-native';
import {Portal} from 'react-native-paper';
import {PanGestureHandler} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SvgXml } from 'react-native-svg';

import Modal from 'react-native-modal';
import { connect } from "react-redux";

import MapView, { PROVIDER_GOOGLE ,Marker,Callout} from 'react-native-maps';

function Myinformation(props){
    
    const bottomSheetHeight =Dimensions.get("window").height *0.9;
    const deviceWidth = Dimensions.get("window").width;
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
    const [open,setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


       
  const xml1 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14.545" viewBox="0 0 16 14.545">
  <g id="Alert" transform="translate(-29.847 -145.097)">
    <path id="Path_884" data-name="Path 884" d="M45.847,157.269a5.282,5.282,0,0,1-.19.718,2.5,2.5,0,0,1-1.926,1.6,3.5,3.5,0,0,1-.656.056q-5.261,0-10.523,0a2.646,2.646,0,0,1-1.626-.5,2.615,2.615,0,0,1-.666-3.52q1.994-3.45,3.987-6.9c.442-.765.879-1.532,1.324-2.3a2.5,2.5,0,0,1,1.9-1.3,2.461,2.461,0,0,1,2.509,1.1c.373.555.687,1.151,1.023,1.731q2.093,3.618,4.181,7.239a4.765,4.765,0,0,1,.551,1.11c.045.166.075.336.111.5Zm-8,1.625H43.1a3.391,3.391,0,0,0,.367-.02,1.855,1.855,0,0,0,1.583-2.224,3.2,3.2,0,0,0-.41-.889q-1.451-2.515-2.9-5.03-1.125-1.948-2.249-3.9a1.884,1.884,0,0,0-1.282-.959,1.825,1.825,0,0,0-1.892.783c-.389.636-.756,1.287-1.129,1.933q-1.767,3.057-3.531,6.116c-.3.518-.608,1.032-.885,1.561a1.828,1.828,0,0,0,.256,1.959,1.873,1.873,0,0,0,1.488.668Z" transform="translate(0 0)" fill="lime"/>
    <path id="Path_885" data-name="Path 885" d="M80.526,201.3q-2.555,0-5.11,0a1.621,1.621,0,0,1-.878-.223A1.522,1.522,0,0,1,74.021,199c.61-1.067,1.228-2.13,1.842-3.195l2.791-4.833c.2-.34.384-.687.595-1.018a1.507,1.507,0,0,1,2.567,0c.383.61.729,1.244,1.089,1.868q2.055,3.559,4.11,7.118a1.533,1.533,0,0,1-1.347,2.359H80.526Zm.948-6.959h0c0-.534.017-1.068,0-1.6a.932.932,0,0,0-1.371-.755.915.915,0,0,0-.5.849c0,1.006,0,2.013,0,3.019,0,.04,0,.079.006.119a.942.942,0,0,0,1.359.735.923.923,0,0,0,.515-.862C81.476,195.346,81.473,194.845,81.473,194.344Zm-.925,3.322a.964.964,0,1,0,.95.98A.975.975,0,0,0,80.549,197.666Z" transform="translate(-42.686 -42.862)" fill="lime"/>
  </g>
</svg>

  `;
       
const xml2 = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14.545" viewBox="0 0 16 14.545">
  <g id="Alert" transform="translate(-29.847 -145.097)">
    <path id="Path_884" data-name="Path 884" d="M45.847,157.269a5.282,5.282,0,0,1-.19.718,2.5,2.5,0,0,1-1.926,1.6,3.5,3.5,0,0,1-.656.056q-5.261,0-10.523,0a2.646,2.646,0,0,1-1.626-.5,2.615,2.615,0,0,1-.666-3.52q1.994-3.45,3.987-6.9c.442-.765.879-1.532,1.324-2.3a2.5,2.5,0,0,1,1.9-1.3,2.461,2.461,0,0,1,2.509,1.1c.373.555.687,1.151,1.023,1.731q2.093,3.618,4.181,7.239a4.765,4.765,0,0,1,.551,1.11c.045.166.075.336.111.5Zm-8,1.625H43.1a3.391,3.391,0,0,0,.367-.02,1.855,1.855,0,0,0,1.583-2.224,3.2,3.2,0,0,0-.41-.889q-1.451-2.515-2.9-5.03-1.125-1.948-2.249-3.9a1.884,1.884,0,0,0-1.282-.959,1.825,1.825,0,0,0-1.892.783c-.389.636-.756,1.287-1.129,1.933q-1.767,3.057-3.531,6.116c-.3.518-.608,1.032-.885,1.561a1.828,1.828,0,0,0,.256,1.959,1.873,1.873,0,0,0,1.488.668Z" transform="translate(0 0)" fill="#ff2a00"/>
    <path id="Path_885" data-name="Path 885" d="M80.526,201.3q-2.555,0-5.11,0a1.621,1.621,0,0,1-.878-.223A1.522,1.522,0,0,1,74.021,199c.61-1.067,1.228-2.13,1.842-3.195l2.791-4.833c.2-.34.384-.687.595-1.018a1.507,1.507,0,0,1,2.567,0c.383.61.729,1.244,1.089,1.868q2.055,3.559,4.11,7.118a1.533,1.533,0,0,1-1.347,2.359H80.526Zm.948-6.959h0c0-.534.017-1.068,0-1.6a.932.932,0,0,0-1.371-.755.915.915,0,0,0-.5.849c0,1.006,0,2.013,0,3.019,0,.04,0,.079.006.119a.942.942,0,0,0,1.359.735.923.923,0,0,0,.515-.862C81.476,195.346,81.473,194.845,81.473,194.344Zm-.925,3.322a.964.964,0,1,0,.95.98A.975.975,0,0,0,80.549,197.666Z" transform="translate(-42.686 -42.862)" fill="#ff2a00"/>
  </g>
</svg>

`;
     
const xml3 = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14.545" viewBox="0 0 16 14.545">
  <g id="Alert" transform="translate(-29.847 -145.097)">
    <path id="Path_884" data-name="Path 884" d="M45.847,157.269a5.282,5.282,0,0,1-.19.718,2.5,2.5,0,0,1-1.926,1.6,3.5,3.5,0,0,1-.656.056q-5.261,0-10.523,0a2.646,2.646,0,0,1-1.626-.5,2.615,2.615,0,0,1-.666-3.52q1.994-3.45,3.987-6.9c.442-.765.879-1.532,1.324-2.3a2.5,2.5,0,0,1,1.9-1.3,2.461,2.461,0,0,1,2.509,1.1c.373.555.687,1.151,1.023,1.731q2.093,3.618,4.181,7.239a4.765,4.765,0,0,1,.551,1.11c.045.166.075.336.111.5Zm-8,1.625H43.1a3.391,3.391,0,0,0,.367-.02,1.855,1.855,0,0,0,1.583-2.224,3.2,3.2,0,0,0-.41-.889q-1.451-2.515-2.9-5.03-1.125-1.948-2.249-3.9a1.884,1.884,0,0,0-1.282-.959,1.825,1.825,0,0,0-1.892.783c-.389.636-.756,1.287-1.129,1.933q-1.767,3.057-3.531,6.116c-.3.518-.608,1.032-.885,1.561a1.828,1.828,0,0,0,.256,1.959,1.873,1.873,0,0,0,1.488.668Z" transform="translate(0 0)" fill="#ff0"/>
    <path id="Path_885" data-name="Path 885" d="M80.526,201.3q-2.555,0-5.11,0a1.621,1.621,0,0,1-.878-.223A1.522,1.522,0,0,1,74.021,199c.61-1.067,1.228-2.13,1.842-3.195l2.791-4.833c.2-.34.384-.687.595-1.018a1.507,1.507,0,0,1,2.567,0c.383.61.729,1.244,1.089,1.868q2.055,3.559,4.11,7.118a1.533,1.533,0,0,1-1.347,2.359H80.526Zm.948-6.959h0c0-.534.017-1.068,0-1.6a.932.932,0,0,0-1.371-.755.915.915,0,0,0-.5.849c0,1.006,0,2.013,0,3.019,0,.04,0,.079.006.119a.942.942,0,0,0,1.359.735.923.923,0,0,0,.515-.862C81.476,195.346,81.473,194.845,81.473,194.344Zm-.925,3.322a.964.964,0,1,0,.95.98A.975.975,0,0,0,80.549,197.666Z" transform="translate(-42.686 -42.862)" fill="#ff0"/>
  </g>
</svg>

`;


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
    
    
    useEffect( () =>{
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
    
    }, [open]);
    
    return(
        <>
      

    

      <Marker  onCalloutPress={() =>
        props.logindata.isLoggedIn == false ? props.actionn() :
      
      setOpen(true)}    style={{width:50,height:50}}   coordinate={{ latitude: parseFloat(props.latitude),
                    longitude: parseFloat(props.longitude)}}  description={props.description}
                    title={props.title} 
                    >


{

props.risklevel == "Normal"  ?  <SvgXml xml={xml1} style={{alignSelf:"center",width: 25, height:25}}  />  :
props.risklevel == "High" ?  <SvgXml xml={xml2} style={{alignSelf:"center",width: 25, height:25}}  />  :
props.risklevel == "Medium"   ?  <SvgXml xml={xml3} style={{alignSelf:"center",width: 25, height:25}}  /> : 
null
}

<Callout     >
    
              <View>
                <View style={styles.bubble}>
                  <Text  style={styles.name}>{props.title}</Text>
                 
                  
                </View>
              
              </View>
            </Callout>

                    </Marker>


  
          
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
   
   <View style={{justifyContent:"center",height:50,backgroundColor:"white",alignSelf:"center",width:'100%',display:"flex",flexDirection:"row"}} >
       
       
     <TouchableOpacity style={{borderRadius:20,marginLeft:'3%',padding:5,backgroundColor:"#082D7B",alignContent:"center",alignSelf:"center",position:"absolute",left:0,display:"flex",flexDirection:"row"}}  onPress = {()=> setOpen(false)} >
           <Icon name="chevron-left" size={14} color="white" style={{justifyContent:"center",alignSelf:"center"}}  />
   <Text  onPress = {()=> setOpen(false)}  style={{fontSize:13,justifyContent:"center",alignSelf:"center",color:"white"}}>National News Map</Text>
   </TouchableOpacity>  
       
           </View>
   
   
   
   
   
   </View>
   </PanGestureHandler>
   
   <Text style={{marginTop:'5%',color:"black",alignSelf:"center"}}>{props.title}</Text>
   <Text style={{marginTop:'5%',paddingLeft:'4%',textAlign:"justify",paddingRight:'4%',color:"black"}}>{props.description}</Text>
   
   
   </Animated.View>
   
    </Portal>
   
  

        </>


    )};


    const mapStateToProps = (state) =>{
        return  {
          logindata : state.loginreducer
        }
          
        }
        
        export default connect (mapStateToProps ,null)(Myinformation)

const styles = StyleSheet.create({
    name: {
        fontSize: 16,
        marginBottom: 5,color:"black"
      },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
       
        padding: 15,
        width: 150,
      },
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
        height:40,
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
        textAlign: "center",marginTop:15
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
      }
  })