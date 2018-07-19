import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import propTypes from 'prop-types';
import classnames from 'classnames';
import swal from 'sweetalert';
import { GoogleLogin } from 'react-google-login';

import { login } from './action';
import './styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    const { isAuthenticated } = this.props.authLogin;
    if(isAuthenticated) {
      window.location.href = '/today';
    }
  }

  componentDidUpdate() {
    const { authLogin } = this.props;
    const { errors } = this.state;
    if (authLogin.errorData !== undefined && errors !== authLogin.errorData) {
      this.setState({ errors: authLogin.errorData });
    }

    if(authLogin.isAuthenticated) {  
      window.location.href = '/today';
    }
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { email, password } = this.state;
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
      authType: 'common'
    }

    this.props.login(userData);
  }

  responseGoogle = (response) => {
    if(
      response.profileObj.email.includes('@techinasia.com')
      || response.profileObj.email === 'volttide@gmail.com'
    ) {
      const userData = {
        email: response.profileObj.email,
        name: response.profileObj.name,
        avatar: response.profileObj.imageUrl,
        googleId: response.profileObj.googleId,
        authType: 'google',
      }

      this.props.login(userData);
    }else{
      swal("Failed to login/register", 'please use @techinasia account', "error")
      .then(value => {
        if (value) {
          window.location.href = '/login';
        }
      })
    }
  }

  render() {
    const { errors, email, password } = this.state;
    const { onSubmit, onInputChange } = this;

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
                    <h4 className="card-title">Login</h4>
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">E-Mail Address</label>
                        <input 
                          id="email" 
                          type="email" 
                          value={email}
                          className={classnames("form-control", {"is-invalid":errors.email})} 
                          name="email" 
                          autoFocus
                          onChange={onInputChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password
                          <a href="forgot.html" className="float-right">
                            Forgot Password?
                          </a>
                        </label>
                        <input 
                          id="password" 
                          type="password" 
                          value={password}
                          className={classnames("form-control", {"is-invalid":errors.password})}  
                          name="password" 
                          data-eye 
                          onChange={onInputChange}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <label>
                          <input type="checkbox" name="remember" /> Remember Me
                        </label>
                      </div>

                      <div className="form-group no-margin">
                        <button type="submit" className="btn btn-danger btn-block">
                          Login
                        </button>
                      </div>

                      <div className="hr-sect">or</div>

                      <div className="form-group no-margin">
                        <GoogleLogin
                        
                          // clientId="62600506754-5i8j7e1d0nrigo3ahvmbj7oan5rqr4sk.apps.googleusercontent.com"
                          clientId="338227420963-2c3l76mmsn5vm7q8bd0ktus8lfg4kba0.apps.googleusercontent.com"
                          // buttonText="Login"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          className="btn btn-primary btn-block"
                        ><i className="fab fa-google"></i>Login with Google</GoogleLogin>
                      </div>

                      <div className="margin-top20 text-center">
                        Don't have an account? <Link to="/register">Create One</Link>
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
    )
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
  authLogin: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  authLogin: state.authLogin,
  errors: state.errors
})

export default connect(mapStateToProps, { login })(Login);
