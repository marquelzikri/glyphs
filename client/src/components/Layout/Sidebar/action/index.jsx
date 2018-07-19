import { GET_RSS, GET_RSS_SUCCESS, GET_RSS_ERROR } from "../constant";
import call from '../api';

export const getRSS = () => {
  return async dispatch => {
    dispatch({type: GET_RSS});

    const response = await call.getRSS();

    if (response.msg === 'success') {
      dispatch(getRSS_Succes(response.data));
    }
    if (response.msg === 'error') {
      dispatch(getRSS_Error(response.data));
    }
  }
}

export const getRSS_Succes = data => {
  return {
    type: GET_RSS_SUCCESS,
    payload: data
  }
}

export const getRSS_Error = error => {
  return {
    type: GET_RSS_ERROR,
    payload: error
  }
}
