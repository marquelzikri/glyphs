import { REGISTER_USER_ERROR, REGISTER_USER, REGISTER_USER_SUCCESS } from '../constant';

import { 
  errorRegister, 
  successRegister, 
  startRegister,
} from '../util';

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return Object.assign({}, startRegister(state));
    case REGISTER_USER_SUCCESS: 
      const user = { ...action.payload } 
      return Object.assign({}, successRegister(state), { user });
    case REGISTER_USER_ERROR:
      const errorData = { ...action.payload }
      return Object.assign({}, errorRegister(state), { errorData });
    default :
      return state;
  }
}

