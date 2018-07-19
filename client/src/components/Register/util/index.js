const startRegister = state => ({
  error: false, 
  success: false,
  errorData: {},
  user: {}
});

const successRegister = state => ({
  error: false, 
  success: true,
  errorData: {},
  user: {}
});

const errorRegister = state => ({
  error: true, 
  success: false,
  errorData: {},
  user: {}
});

export {
  startRegister,
  successRegister,
  errorRegister
};