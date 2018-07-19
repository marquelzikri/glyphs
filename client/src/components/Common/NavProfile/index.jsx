import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logoutUser } from '../../Login/action';

import './style/nav-profile.css';

class NavProfile extends Component {
  onLogoutClick(e) {
    const { logoutUser } = this.props;
    e.preventDefault();
    logoutUser();

    window.location.href = '/login';
  }

  componentDidMount(){
    const { isAuthenticated } = this.props.authLogin;
    if(!isAuthenticated) {
      window.location.href = '/login';
    }
  }

  render() {
    const { props, onLogoutClick } = this;
    const { authLogin, navType } = props;
    const { avatar } = authLogin.user;

    let renderAvatar = avatar;

    if (avatar) {
      if (!avatar.includes('https:')){
        renderAvatar = 'https:'+avatar
      }
    }

    return (
      <li className={navType+" dropdown"}>
        <Link 
          className="nav-link dropdown-toggle" 
          to="/" 
          id="navbarDropdown" 
          role="button" 
          data-toggle="dropdown" 
          aria-haspopup="true" 
          aria-expanded="false"
        >
          <img 
            src={renderAvatar} 
            alt="" 
            width="30px" 
            height="30px"
          />
        </Link>

        <div 
          className="dropdown-menu dropdown-menu-right" 
          aria-labelledby="navbarDropdown"
        >
          <Link 
            className="dropdown-item" 
            to="/profile"
          >
            <i className="far fa-user drop-icon-margin"></i>
            Profile
          </Link>
          <div className="dropdown-divider"></div>
          <Link 
            className="dropdown-item" 
            to="/"
          >
            <i className="fas fa-wrench drop-icon-margin"></i>
            Settings
          </Link>
          <div className="dropdown-divider"></div>
          <Link 
            className="dropdown-item" 
            to="/"
          >
            <i className="far fa-question-circle drop-icon-margin"></i>
            Help
          </Link>
          <div className="dropdown-divider"></div>
          <span 
            className="dropdown-item"
            onClick={onLogoutClick.bind(this)}
          >
            <i className="fas fa-sign-out-alt drop-icon-margin"></i>
            Logout
          </span>
        </div>
      </li>
    )
  }
}

NavProfile.propTypes = {
  logoutUser: propTypes.func.isRequired,
  authLogin: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  authLogin: state.authLogin
})

export default connect(mapStateToProps, { logoutUser })(NavProfile);