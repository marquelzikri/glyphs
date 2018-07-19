import {
  GET_RSS,
  GET_RSS_SUCCESS,
  GET_RSS_ERROR,
}from '../constant';

import {
  getRSS_Start,
  getRSS_Success,
  getRSS_Error
}from '../util';

const initialState = {}

export default function(state = initialState, action) {
  switch(action.type){
    case GET_RSS:
      return Object.assign({}, getRSS_Start(state));
    case GET_RSS_SUCCESS:
      const getRSSData = action.payload;
      return Object.assign({}, getRSS_Success(state), { getRSSData });
    case GET_RSS_ERROR:
      const getRSSErrors = action.payload;
      return Object.assign({}, getRSS_Error(state), { getRSSErrors });
    default:
      return state
  }
}
