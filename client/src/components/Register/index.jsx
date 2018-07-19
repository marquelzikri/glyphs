import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import propTypes from 'prop-types';
import classnames from 'classnames';

import { register } from './action';
import './styles/Register.css';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    const { authRegister } = this.props;
    if(authRegister.isAuthenticated) {
      // eslint-disable-next-line
      <Redirect to = '/login' />
    }
  }

  componentDidUpdate() {
    const { authRegister } = this.props;
    const { errors } = this.state;
    if (authRegister.errorData !== undefined & errors !== authRegister.errorData) {
      this.setState({ errors: authRegister.errorData });
    }

    if (authRegister.success) {
      // eslint-disable-next-line
      <Redirect to = '/login' />
    }
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { register } = this.props;
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    register(newUser);
  }

  render () {
    const { errors, name, email, password, password2 } = this.state;
    const { onInputChange, onSubmit } = this;

    document.body.style.overflow = "auto";

    return (
      <div className="my-login-page">
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-md-center h-100">
              <div className="card-wrapper">
                <div className="brand">
                  <img 
                    className="login-logo"
                    src="https://id.techinasia.com/assets/1edc904cfe7c965859a475f15430145b.svg" 
                    alt="Tech in Asia Indonesia"
                  />
                </div>
                <div className="card fat">
                  <div className="card-body">
                    <h4 className="card-title">Register</h4>
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input 
                          id="fullName" 
                          type="text" 
                          className={classnames('form-control', {'is-invalid':errors.name})}
                          name="name"  
                          autoFocus 
                          value = {name}
                          onChange = {onInputChange}
                          required
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">E-Mail Address</label>
                        <input 
                          id="email" 
                          type="email" 
                          className={classnames('form-control', 
                            {
                              'is-invalid':errors.email
                            }
                          )}
                          name="email"  
                          value = {email}
                          onChange = {onInputChange}
                          required
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                          id="password" 
                          type="password" 
                          className={classnames('form-control', 
                            {
                              'is-invalid':errors.password
                            }
                          )}
                          name="password"  
                          data-eye 
                          value = {password}
                          onChange = {onInputChange}
                          required
                        />
                        {errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="password2">Retype Password</label>
                        <input 
                          id="password2" 
                          type="password" 
                          className={classnames('form-control', 
                            {
                              'is-invalid':errors.password2
                            }
                          )} 
                          name="password2"  
                          data-eye 
                          value = {password2}
                          onChange = {onInputChange}
                          required
                        />
                        {errors.password2 && (
                          <div className="invalid-feedback">{errors.password2}</div>
                        )}
                      </div>

                      <hr/>

                      <div className="form-group no-margin">
                        <button type="submit" className="btn btn-danger btn-block">
                          Register
                        </button>
                      </div>
                      <div className="margin-top20 text-center">
                        Already have an account? <Link to="/login">Login</Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="footer">
                  Copyright &copy; 2018 &mdash; TECH IN ASIA. 
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Register.propTypes = {
  register: propTypes.func.isRequired,
  authRegister: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  authRegister: state.authRegister
});

export default connect(mapStateToProps, { register })(Register);
