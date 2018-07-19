const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateContentInput(data) {
  let errors = {};

  data.URL = !isEmpty(data.URL) ? data.URL : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  // data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.URL)) {
    errors.URL = 'URL field is required';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Choose one of categories';
  }

  if (!Validator.isURL(data.URL)) {
    errors.URL = 'URL is invalid';
  }

  // if (Validator.isEmpty(data.text)) {
  //   errors.text = 'Comment field is required';
  // }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}