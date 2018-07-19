const startLogin = state => ({
  temp_email: '',
  temp_name: '',
  temp_avatar: '',
  temp_googleId: '',
  temp_authType: '',
  error: false, 
  success: false,
  errorData: {},
  user: {}
})

const successLogin = state => ({
  error: false, 
  success: true,
  errorData: {},
  user: {}
})

const errorLogin = state => ({
  temp_email: state.temp_email,
  temp_name: state.temp_name,
  temp_avatar: state.temp_avatar,
  temp_googleId: state.temp_googleId,
  temp_authType: state.temp_authType,
  error: true, 
  success: false,
  errorData: {},
  user: {},
})

export {
  startLogin,
  successLogin,
  errorLogin
};