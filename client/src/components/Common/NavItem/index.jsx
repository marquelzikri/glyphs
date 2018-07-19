import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './style/nav-item.css';

class NavItem extends Component {
  render () {
    const { navType, icon } = this.props;
    return (
      // navType = nav-item or sidenav-item
      <li className={navType}> 
        <Link className="nav-link" to="/">
          <i className={classnames("far nav-icon", {
              "fa-envelope": icon === "message",
              "fa-bell": icon === "notification"
            })
          }>
          </i>
          {/* <span className="badge badge-light notification">{this.props.messagesCount}</span> */}
          <span className="badge badge-light notification">6</span>
        </Link>
      </li>
    )
  }
}

export default NavItem;

// ToDo: add screen width detector 