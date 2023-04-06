import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import { TouchableOpacity,SafeAreaView,Platform, PermissionsAndroid, Button, Alert, StyleSheet,View,Text,Pressable,TextInput ,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Geocoder from 'react-native-geocoding';
import { connect } from "react-redux";
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import * as OpenAnything from 'react-native-openanything';

const CurrentPosition = ({route}) => {
  const [latitudee, setLatitudee] = useState(33.888630);
  const [longitudee, setLongitudee] = useState(35.495480);
  const[overlayvisible,setOverlayvisible]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigationscreen = useNavigation();

  const [data, setData] = React.useState({
   username :route.params.name,
   lastname :'',
   location :"",
   country :'Lebanon',
   description:''

});
const [address,setAddress]=useState('');


useEffect(() => {
   
    async function requestPermissions() {



        if (Platform.OS === 'ios') {
          const auth = await Geolocation.requestAuthorization("whenInUse");
          if(auth === "granted") {
             // do something if granted...
             Geolocation.getCurrentPosition(
              position => {
               const latitude =position.coords.latitude;
               const longitude = position.coords.longitude;
               setOverlayvisible(true);
                setLatitudee(latitude);
                setLongitudee(longitude);

                Geocoder.from(position.coords.latitude, position.coords.longitude)
  
  
                .then(json => {
                  var addressComponent = json.results[4].formatted_address;

                  setData({
                    ...data,
                   location: addressComponent,
                   
                });    
                setOverlayvisible(false);

                })
             

                .catch(error => console.warn(error));


              },
              error => {
              
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          }
        }
      
        if (Platform.OS === 'android') {
         
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
         
          if ( PermissionsAndroid.RESULTS.GRANTED === "granted") {
           
            Geolocation.getCurrentPosition(
                position => {
                 const latitude =position.coords.latitude;
                 const longitude = position.coords.longitude;
                 setOverlayvisible(true);
                  setLatitudee(latitude);
                  setLongitudee(longitude);

                  Geocoder.from(position.coords.latitude, position.coords.longitude)
    
    
                  .then(json => {
                    var addressComponent = json.results[4].formatted_address;
  
                    setData({
                      ...data,
                     location: addressComponent,
                     
                  });    
                  setOverlayvisible(false);
  
                  })
               
  
                  .catch(error => console.warn(error));


                },
                error => {
                
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
              );}
      
          
        }
      }
  requestPermissions()
}, [])

  const getme = () => {
    
   

    async function requestPermissions() {



        if (Platform.OS === 'ios') {
          const auth = await Geolocation.requestAuthorization("whenInUse");
          if(auth === "granted") {
             // do something if granted...
          }
        }
      
        if (Platform.OS === 'android') {
         
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if ( PermissionsAndroid.RESULTS.GRANTED === "granted") {
          
            Geolocation.getCurrentPosition(
                position => {
                 const latitude =position.coords.latitude;
                 const longitude = position.coords.longitude;
                  setLatitudee(latitude);
                  setLongitudee(longitude);
                },
                error => {
               
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
              );}
      
          
        }
      }
  requestPermissions()
    }

    const textInputChange = (val) => {
        
            setData({
                ...data,
               description: val,
               
            });
       
    }

    const sendmessage = () =>{

      OpenAnything.Text('+9611999966',data.username+data.lastname
      +"longitude"+longitudee
      +"latitude"+latitudee+"location"+data.location+"in"+data.country+"description"+data.description);
    //  setModalVisible(true)

    }
  const getaddress = () =>{

  //  Geocoder.init('AIzaSyDihE6sMizsv8qxZ_IBbIT-g8DmLs8qi_E');
   

// Search by geo-location (reverse geo-code)
//Geocoder.from(41.89, 12.49)
	//	.then(json => {
    //    		var addressComponent = json.results[0].address_components[0];
			//console.log(addressComponent);
		//})
		//.catch(error => console.warn(error));


  }  

  

  return (
      <>
      <OrientationLoadingOverlay
          visible={overlayvisible}
          color="white"
          indicatorSize="large"
          messageFontSize={24} style={styles.overlaycontainer}
          
          />

      <View style={{justifyContent:"center",height: Platform.OS === 'ios' ? 70 : 50,backgroundColor:"white",alignSelf:"center",width:'100%',display:"flex",flexDirection:"row"}} >

  
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
             <Text>Message Received</Text>
            <Text style={styles.modalText}>Your state of emergency has been received
The Metropolitan Security Team is on the way!
</Text>

  <Text style={{color:"#093AA0"}}  onPress={() => setModalVisible(!modalVisible)} >Continue</Text>


            
          </View>
        </Pressable>
     
      </Modal>
    
   
      <TouchableOpacity  onPress = {() =>    navigationscreen.navigate('Profile',{
             unit : route.params.unit , division : route.params.division

         })}
          style={{borderRadius:20,marginLeft:'3%',padding:5,backgroundColor:"#082D7B",alignContent:"center",alignSelf:"center",position:"absolute",left:0,display:"flex",flexDirection:"row",top:Platform.OS === 'ios' ? 40 : 10}} >
   
     <Icon   name="chevron-left" size={14} color="white" style={{justifyContent:"center",alignSelf:"center"}}  />
<Text   style={{fontSize:13,justifyContent:"center",alignSelf:"center",color:"white"}}> Dashboard</Text>
</TouchableOpacity>
   
        <View style={{alignSelf:"center",justifyContent:"center",display:"flex",flexDirection:"row"}}  >
        <Text style={{fontSize:17,alignSelf:"center",alignContent:"center",alignItems:"center",textAlign:"center",color:"black",paddingTop:Platform.OS === 'ios' ? '10%' : '0%'}}>SOS</Text>
           </View>
       </View>

<View style={styles.infocontainer}>
<Text style={styles.contentcolor}>{data.username} {data.lastname}</Text>
<Text style={styles.contentcolor}>ecurity Team will be on their way</Text>

<Text style={styles.contentcolor}>Your location coordinates</Text>
<Text style={styles.contentcolor}>{data.location}</Text>
<Text style={styles.contentcolor}>{data.country}</Text>
<Text style={styles.contentcolor}>Lat:{latitudee} | Long:{longitudee}</Text>


<Pressable onPress = {() =>    navigationscreen.navigate('Profile',{
             unit : route.params.unit , division : route.params.division

         })} style={styles.cancelbutton}    >
      <Text style={styles.text}>Cancel</Text>
    </Pressable>
</View>
<Text style={styles.text2}>WHAT HAPPENED ?</Text>
<View style={styles.whathappened}>
<TextInput placeholder="Describe Your Situation"
placeholderTextColor="#093AA0"    onChangeText={(val) => textInputChange(val)}  
style={styles.input}></TextInput>
</View>
<Pressable onPress={sendmessage} style={styles.sendbutton}   >
      <Text style={styles.text3}>Send</Text>
    </Pressable>
   
    
    
    </>
  );
};

const mapStateToProps = (state) =>{
  return  {
    logindata : state.loginreducer
  }
    
  }
  
  export default connect (mapStateToProps ,null)(CurrentPosition)


const styles = StyleSheet.create({
  overlaycontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    infocontainer:{
        backgroundColor:"#093AA0",
        borderRadius:20,
        width:'90%',
        alignSelf:"center",
        textAlign:"center",
        justifyContent:'center',
        height:"auto",
        marginTop:'2%',
        alignItems:"center",
        color:"white",
        padding:'5%',alignItems:"center"

    },
contentcolor:{
color:"white",
fontWeight:"bold",
fontSize:16,textAlign:"center"

},
cancelbutton:{
backgroundColor:"white",
borderRadius:15,
width:'40%',
height:'15%',
justifyContent:"center",
alignItems:'center',
marginTop:'3%'



},
text:{
    color:"#093AA0",
    fontSize:20,
    alignSelf:'center'
},
text2:{
    color:"#093AA0",
    fontSize:20,
    alignSelf:'center',
    padding:'2%'
},
whathappened:{
    backgroundColor:"white",
    height:140,
    width:'90%',
    borderRadius:20,
    alignSelf:"center",
    padding:'3%',
},
input:{
  
    color:"#093AA0",
    fontSize:15
  
},
sendbutton:{
    backgroundColor:"#093AA0",
    width:'35%',
    height:'8%',
    justifyContent:"center",
    alignSelf:"center",
    alignItems:"center",
    borderRadius:20,
    marginTop:'2%'

},
text3:{
    color:"white",
    fontSize:20

},
turnonbutton:{
    marginBottom:'2%',
    height:'10%',
    width:'40%',
    backgroundColor:"white",
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20
},   centeredView: {
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
  textAlign: "center",marginTop:15
}

})