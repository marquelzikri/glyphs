const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFeedInput(data) {
  let errors = {};

  data.URL = !isEmpty(data.URL) ? data.URL : '';

  if (Validator.isEmpty(data.URL)) {
    errors.URL = 'URL field is required';
  }

  if (!Validator.isURL(data.URL)) {
    errors.URL = 'URL feed is invalid';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}