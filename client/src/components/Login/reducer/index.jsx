import { SET_CURRENT_USER, LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from '../constant';
import isEmpty from '../../../validation/is-empty';
import { 
  errorLogin, 
  successLogin, 
  startLogin,
} from '../util';

const initialState = {
  isAuthenticated: false,
  user: {},
}

export default function(state = initialState, action) {
  let errorData;
  switch (action.type) {
    case LOGIN_USER:
    const temp_email = action.payload.email;
    const temp_name = action.payload.name;
    const temp_avatar = action.payload.avatar;
    const temp_googleId = action.payload.googleId;
    const temp_authType = action.payload.authType;
      return Object.assign({}, startLogin(state), { temp_email, temp_name, temp_avatar, temp_googleId, temp_authType });
    case LOGIN_USER_SUCCESS:
      const token = { ...action.payload }
      return Object.assign({}, successLogin(state), { token });
    case LOGIN_USER_ERROR:
      errorData = { ...action.payload }
      return Object.assign({}, errorLogin(state), { errorData });

    case SET_CURRENT_USER:
      return{
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default :
      return state;
  }
}

