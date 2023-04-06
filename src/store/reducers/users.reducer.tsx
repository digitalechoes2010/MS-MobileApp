import { USERS_SET } from "../actionTypes/users.types.d";



const initialState = {

}

const usersreducer=(state = initialState,action:any)=>{
switch(action.type){

case USERS_SET :
    
         const { payload} =action;
             
            return {...state,payload }
 

default:
return state;
}}
export  default usersreducer
