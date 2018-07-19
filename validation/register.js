const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(!Validator.isLength(data.name, { min:2, max:50 })){
    errors.name = 'Name must be between 2 and 50 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)&&data.authType!=='google') {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.password2)&&data.authType!=='google') {
    errors.password2 = 'Retype your password';
  }

  if(!Validator.isLength(data.password, { min:6, max:16 })&&data.authType!=='google'){
    errors.password = 'Password must be between 6 and 16 characters';
  }

  if(!Validator.equals(data.password, data.password2)&&data.authType!=='google'){
    errors.password2 = "Passwords isn't match"; 
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}