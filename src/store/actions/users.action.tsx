import { USERS_GET } from "../actionTypes/users.types.d";
import { USERS_SET } from "../actionTypes/users.types.d";

export function usersget (){
    const action = {type: USERS_GET}
    return action;
}

export function usersSet (payload :any){
    const action = {type: USERS_SET , payload}
    return action;
}