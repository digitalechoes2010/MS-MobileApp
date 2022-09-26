import {SET_KILOMETERS, SET_MILES} from './distanceActionTypes';

const initialState = {distance: 'Km'};

const DistanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KILOMETERS:
      return {distance: 'Km'};
    case SET_MILES:
      return {distance: 'Miles'};
    default:
      return state;
  }
};

export default DistanceReducer;