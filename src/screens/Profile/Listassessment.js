import React ,{useRef,useEffect,useState} from 'react';
import {Text ,View,FlatList,Image} from 'react-native';
import {List} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { getrisknews } from '../../redux/actions';

export default function Mapdetail() {
  const  {risknews} = useSelector (state =>state.userReducer);
  const dispatch = useDispatch();

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
      },[]);

    return (
        <>
 <FlatList style={{height:"auto",padding:'5%'}}
        data={risknews}

       
       
        renderItem={({ item }) => (
         

            <List.Item 
            
             title={({ size, color }) => ( <Text style={{color:"black"}}>{item.title}</Text> )}

            description={({ size, color }) => ( <>
            <View style={{display:"flex",flexDirection:'row'}}>
            <Image style={{alignItems:"center",alignSelf:"center"}}
                source={
                    item.risklevel == "Normal" ? require('../../assets/greenalert.png') :
                    item.risklevel == "High" ? require('../../assets/redalert.png') :
                    item.risklevel == "Medium" ? require('../../assets/yellowalert.png') :
                    null
                   } 
                    
                    />  
            <Text style={{color:"black"}} >  Risk: {item.risklevel}</Text>
            </View>
            </>) }
           
            right={props => <List.Icon { ...props} color="white" style={{alignSelf:"center"}}  icon={({ size, color }) => (
            
                <Icon name="chevron-right" size={16} color="#093A9E" 
                style={{justifyContent:"center",alignSelf:"center",alignContent:"center",alignItems:"center"}}  />

                
              )} />}
        
          />
        
            
            
        
        )}
       
        ItemSeparatorComponent={renderSeparator}
        
        
      />
    
     
        </>
    )
}
