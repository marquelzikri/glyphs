import { 
  SET_CURRENT_USER, 
  LOGIN_USER,
  LOGIN_USER_ERROR
} from '../constant';

import setAuthToken from '../../../utils/setAuthToken';

import jwt_decode from 'jwt-decode';

import call from '../api/index.js';

export const login = userData => {
  return async dispatch => {
    dispatch({type: LOGIN_USER, payload:userData});

    let response = await call.login(userData);

    if (response.msg === 'success' && !response.data.msg) {
      dispatch(loginSuccess(response.data.token));
    }

    if (response.msg === 'error') {
      if (response.data.msg === 'Please signup.') {
        let response2 = await call.register(userData);
        if (response2.msg === 'success') {
          console.log('here');
          dispatch(login(userData));
        }
      }
      dispatch(loginError(response.data));
    }
  }
}

export const loginSuccess = token => dispatch =>{
  localStorage.setItem('jwtToken', token);
  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decodedData = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decodedData));
}

export const loginError = error => {
  return {
    type: LOGIN_USER_ERROR,
    payload: error
  }
}

// Set current logged in user
export const setCurrentUser = (decodedData) => {
  return{
    type: SET_CURRENT_USER,
    payload: decodedData
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove Auth header for future request
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}
