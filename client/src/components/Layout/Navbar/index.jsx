import React, { Component } from 'react';

import './style/Navbar.css';
import NavItem from '../../Common/NavItem';
import NavProfile from '../../Common/NavProfile';

class Navbar extends Component {
  render() {
    const { md4_md8, showSidebar,  } = this.props;

    return(
      <div>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "white" }}>
          <div className={"navbar-brand" + (md4_md8 ? " col-md-4 col-sm-4" : " col-md-2 col-sm-4")} onClick={showSidebar}>
            <span className="navbar-brand-title" >TECHINASIA ID</span>
          </div>
            <ul className="navbar-nav ml-auto">

              <NavItem navType="nav-item" icon="message"/>

              <NavItem navType="nav-item" icon="notification"/>

              <NavProfile navType="nav-item" />
            </ul>
        </nav>
      </div>
    )
  }
}

export default Navbar;
