export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const INCREASE_AGE = 'INCREASE_AGE';
export const GET_CITIES = 'GET_CITIES';
export const GET_RISKNEWS='GET_RISKNEWS';
export const GET_SPECIALNEWS="GET_SPECIALNEWS";




const API_URL = 'https://echoes.agency/news';
const risknewsurl ='https://echoes.agency/nationalrisknews';
const specialnews="https://echoes.agency/specialnews";


export const getCities = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await result.json();
          
            
            if (json) {
                dispatch({
                    type: GET_CITIES,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
              
            }
        }
    } catch (error) {
        console.log("the error is ")
        console.log(error);
    }
}

export const getrisknews = () => {
    try {
        return async dispatch => {
            const result = await fetch(risknewsurl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await result.json();
          
            
            if (json) {
                dispatch({
                    type: GET_RISKNEWS,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
                
            }
        }
    } catch (error) {
        console.log("the error is ")
        console.log(error);
    }
}




export const getspecialnews = () => {
    try {
        return async dispatch => {
            const result = await fetch(specialnews, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await result.json();
          
            
            if (json) {
                dispatch({
                    type: GET_SPECIALNEWS,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
                alert("Check your internet connection");
            }
        }
    } catch (error) {
        console.log("the error is ")
        console.log(error);
    }
}
