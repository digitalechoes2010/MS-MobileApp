import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet , ScrollView,Image,FlatList,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import Alertss from './FlatListDemo';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen'
   import { useSelector, useDispatch } from 'react-redux';
   import { useNavigation } from '@react-navigation/native';
  
import { getCities } from '../../redux/actions';


export default function index() {
    const navigationscreen = useNavigation();
    const  {cities} = useSelector (state =>state.userReducer);
    const dispatch = useDispatch();
    const [filters,setFilters] =useState([]);

    const [arrayname,setArrayname] = useState("cities");

 

   

    useEffect(() => {
    dispatch(getCities());
  
    }, []);
    


const pressme = () =>{
    
    const filterss = cities.filter(x => x.country === 'country1');
     setFilters(filterss)
     setArrayname("filters")
    

}
const pressmeall = () =>{
   
    const filterss = cities;
    setFilters(filterss)
    setArrayname("cities")
   
}


    return (
        <>
        <Text>{ "{"+arrayname+"}"}</Text>
          <Text onPress ={pressme}>country 1 </Text>
          <Text onPress ={pressmeall}>all </Text>

         

       
   
            <ScrollView  style={{height:"auto"}} >
   




           
   <View style={styles.containerhome}>

   <Text style={{fontSize:20}}>Maps</Text>
<View style={{display:"flex",flexDirection:"row"}} >
   
   
    <View  style={styles.containmapinfo}>
    <LinearGradient colors={['#093AA0' , '#093A9E']} style={{ width: 85,height:85,padding:5 ,borderRadius: 50,justifyContent: "center"}}>
    <Image source={ require('../../assets/PoliceStations.png')} style={styles.imagemap}  />

</LinearGradient >
<Text style={styles.maptext}>Police Stations</Text>
</View>
<View style={styles.containmapinfo}>
<LinearGradient colors={['#093A9E' , '#093AA0']} style={{ width: 85,height:85,padding:5 ,borderRadius: 50,justifyContent: "center"}}>
    <Image source={ require('../../assets/Hospitals.png')} style={styles.imagemap}  />

</LinearGradient >
<Text>Hospitals</Text>
</View>
<View  style={styles.containmapinfo}>
<LinearGradient colors={['#093AA0' , '#093AA0']} style={{ width: 85,height:85,padding:5 ,borderRadius: 50,justifyContent: "center"}}>
    <Image source={ require('../../assets/Embassies.png')} style={styles.imagemap}  />

</LinearGradient >

<Text>Embassies</Text>
</View>

    
</View>


<View style={styles.panicview}>
<Text style={{fontSize:20}}>Panic Button</Text>
<TouchableWithoutFeedback onPress = {() =>    navigationscreen.navigate('Panicbutton')}>
<View style={styles.view1}   >
<Image source={ require('../../assets/Panicbutton.png')} style={styles.abouticon}   />
<Text style={styles.textsos2}>{'\n'}Press for 2 seconds</Text>
</View>
</TouchableWithoutFeedback>

<View style={styles.view2}>
    
</View>
<View style={styles.view3}>
    
</View>

<View style={styles.containbuttons}>
<View style={styles.aboutbutton}>
<Image source={ require('../../assets/About.png')} style={styles.abouticon}   />
<Text style={styles.textabout}>About</Text>
</View>
<View style={styles.emergencybutton}>
<TouchableOpacity onPress={() =>    navigationscreen.navigate('Emergency')}>
<Image source={ require('../../assets/Emergency.png')} style={styles.abouticon}   />
<Text style={styles.textabout}>Emergency numbers</Text>
</TouchableOpacity>
</View>


</View>








</View>



<View style={styles.alertview}>
<Alertss ></Alertss>
</View>


<View style={styles.containbuttons}>
<View style={styles.aboutbutton}>
<Image source={ require('../../assets/About.png')} style={styles.abouticon}   />
<Text style={styles.textabout}>{'\n'}About</Text>
</View>
</View>



<View style={styles.followcontainer}>
<Text>Follow us on</Text>
<View style={{display:"flex",flexDirection:"row"}}>

<View style={styles.circlefollow}>

</View>

</View>

</View>
{arrayname == "filters" ? 
<> 


<FlatList style={{height:300}}
                data={filters}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.description}</Text>
                     
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

</> :

<>


<FlatList style={{height:300}}
                data={cities}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.description}</Text>
                       
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />


</>}




   </View>



  

   </ScrollView>
   



     </>
      
    );

}


const styles = StyleSheet.create({
    containerhome:{
       
        width:wp('90%'),
        height:"auto",
        alignSelf:"center",
        marginTop:hp('2%'),
        zIndex:1,
        position:"relative"
       
        
        
        
        
    },
containerholiday:{
    backgroundColor:"white",
    width:wp('100%'),
    height:"auto",
    alignSelf:"center"
},



    containmapinfo:{
        width:wp('30%') , padding: 15, 
        justifyContent:"center",
        alignItems:"center",
       

    },
    mapsscroll:{
        flex:1
    },
    maptext:
    {
alignSelf:"center"
    },

    mapcircle:{
        padding :10,
        borderRadius:600,
      
        marginRight:wp('10%'),
      
        justifyContent:"center",
        
    },
    imagemap:{
        height:50,
        width:50,
        alignSelf:"center"
    },
    panicview:{

width:wp('90%'),
height:"auto",
alignSelf:"center"
    }
    ,
    view1:{
height:hp('20%'),
width:wp('90%'),
backgroundColor:"#093AA0",
borderRadius:20,
zIndex: 1,
justifyContent:"center"
    },
    view2:{
        height:hp('10%'),
        width:wp('80%'),
        backgroundColor:"#093AA0",
        borderRadius:20,
        opacity: 0.5,
        alignSelf:"center",
        marginTop:hp('-9%'),
    },
    view3:{
        height:hp('10%'),
        width:wp('70%'),
        backgroundColor:"#093AA0",
        borderRadius:20,
        opacity: 0.3,
        alignSelf:"center",
        marginTop:hp('-9%'),
    },
    textsos:{


        fontSize:80,
        color:"white",
        alignSelf:"center",
        alignItems:"center"
    },
    
    textsos2:{


        fontSize:14,
        color:"white",
        alignSelf:"center",
        alignItems:"center"
    },
    
    containbuttons:{
          width:wp('90%'),
         
          height:hp('23%'),
          marginTop:hp('2%'),
          display:"flex",
          flexDirection:"row"

    },

    aboutbutton:{
        height:hp('20%'),
        width:wp('43%'),
        backgroundColor:"#093AA0",
        borderRadius:20,
        justifyContent:"center"
    },
    emergencybutton:{
        height:hp('20%'),
        justifyContent:"center",
        width:wp('43%'),
        backgroundColor:"#093AA0",
        borderRadius:20,
        marginLeft:wp('4%'),

        
    },
    abouticon:{
        alignSelf:"center",
       
    }
,
textabout:{
    color:"white",
    alignSelf:"center",
    fontSize:15,
    fontWeight:"bold"
},
alertview:{
    width:wp('90%'),
  
 
     borderRadius:20,
    backgroundColor:"#093AA0",
    alignSelf:"center",
    marginTop:'5%',
   


},
followcontainer:{
    backgroundColor:"pink",
    justifyContent:"center",
    textAlign:"center",
    alignItems:"center",
    height:hp('30%')

},
circlefollow:{
    width:wp('5%'),
    height:hp('5%'),
    backgroundColor:"pink"
}






});

