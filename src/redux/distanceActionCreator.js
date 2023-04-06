import * as distanceActionTypes from './distanceActionTypes';

export const setKilometers = () => {
  const action = {
    type: distanceActionTypes.SET_KILOMETERS,
  };
  return action;
};

export const setMiles = () => {
  const action = {
    type: distanceActionTypes.SET_MILES,
  };
  return action;
};