import React, { Component } from "react";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text, FlatList, ActivityIndicator,Image ,Alert,Pressable,TouchableWithoutFeedback} from "react-native";

import { List, Title } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
export default function FlatListDemo() {
 

  
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

  const handleclick = () => {
    useNavigation().navigate('Alerts')
  };

  const showAlert2 = () => {  
   
}
;

    
      const alert1 = './alert1.png';
      const navigationscreen = useNavigation();
    return (
        <View style={{borderRadius:20,backgroundColor:"#093AA0",margin:'2%',height:"auto"}}>
        
        <View style={{borderRadius:20,display:"flex",
        flexDirection:"row",justifyContent:"center",alignItems:"center"}}>  
        
         <Text style={{color:"white"}} >Location:</Text>
      
         <Image source={require('../../assets/iconmap.png')}></Image>
         <TouchableWithoutFeedback onPress = {() =>    navigationscreen.navigate('Alerts')}>
<Text style={{color:"white"}} >See All</Text>
</TouchableWithoutFeedback>

        </View>

        <FlatList style={{height:"auto"}}
        data={[  {
            name: 'Tripoli - Shooting',
            avatar_url: 'alert1',
            hour:'11',
            subtitle: '4 miles'
          },
          {
            name: 'Tripoli - Shooting',
            avatar_url: 'alert1',
            hour:'11',
            subtitle: '4 miles'
          },
          {
            name: 'Tripoli - Shooting',
            avatar_url: 'alert1',
            hour:'11',
            subtitle: '4 miles'
          },
          {
            name: 'Tripoli - Shooting',
            avatar_url: 'alert1',
            hour:'11',
            subtitle: '4 miles'
          },
          {
            name: 'Tripoli - Shooting',
            avatar_url: 'alert1',
            hour:'11',
            subtitle: '4 miles'
          }
      
        ]}

       
       
        renderItem={({ item }) => (
         

            <List.Item 
             onPress={showAlert2} 
             title={({ size, color }) => ( <Text style={{color:"white"}}>{item.name}</Text> )}

            description={({ size, color }) => ( <><Text style={{color:"white",marginTop:"2%"}}>
                {item.hour - 1 + ' hours ago' }</Text><Text style={{color:"white",marginTop:"2%"}} >{ item.subtitle }</Text></>) }
            left={props => <List.Icon { ...props} color="white"  icon={({ size, color }) => (
            
                <Image
                source={
                    item.avatar_url == "alert1" ? require('./alert1.png') :  
                    require('./alert1.png') }

                  style={{ width: 50, height: 50, tintColor: color }}
                />
              )} />}
        
            right={props => <List.Icon { ...props} color="white" style={{alignSelf:"center"}} icon={require('../../assets/arrow1.png')} />}
        
          />
        
            
            
        
        )}
       
        ItemSeparatorComponent={renderSeparator}
        
        
      />
      </View>
    );
  
}


const styles = StyleSheet.create({
  filterbutton:{
   
    width:'auto',
 height:'auto',

    borderRadius:20,
  

  },
  filtercontainer:{
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 50,
    padding:'1%',
    width:100,
    textAlign:"center",
    alignItems:'center',
    marginRight:'1%'
   
  }
})