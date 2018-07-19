import { 
  REGISTER_USER_ERROR, 
  REGISTER_USER_SUCCESS, 
  REGISTER_USER,
} from '../constant';

import call from '../api/index.js';

// Register user
export const register = userData => {
  return async dispatch => {
    dispatch({type: REGISTER_USER});
    const response = await call.register(userData);

    if (response.msg === 'success') {
      dispatch(registerSuccess(response.data));
    }

    if (response.msg === 'error') {
      dispatch(registerError(response.data));
    }
  }
}

export const registerSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user
  }
}

export const registerError = (error) => {
  return {
    type: REGISTER_USER_ERROR,
    payload: error
  }
}
