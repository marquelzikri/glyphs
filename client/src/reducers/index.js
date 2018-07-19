import { combineReducers } from 'redux';
import authLoginReducer from '../components/Login/reducer';
import authRegisterReducer from '../components/Login/reducer';
import errorReducer from '../components/Login/reducer';
import contentReducer from '../components/Content/reducer';
import postContentReducer from '../components/PostContent/reducer';
import profileReducer from '../components/Profile/reducer';
import sidebarReducer from '../components/Layout/Sidebar/reducer';

export default combineReducers({
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  errors: errorReducer,

  content: contentReducer,
  postContent: postContentReducer,

  profile: profileReducer,
  sidebar: sidebarReducer
});
