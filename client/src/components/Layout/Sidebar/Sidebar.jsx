import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import './style/Sidebar.css';
import NavProfile from "../../Common/NavProfile";
import NavItem from '../../Common/NavItem';
import { capitalize } from '../../../utils/capitalizeFirstLetter';
import classnames from 'classnames';
import { getRSS } from './action/';

class Sidebar extends Component {
  componentDidMount() {
    const { getRSS } = this.props;
    getRSS();
  }

  renderSidebarProfile() {
    return (
      <div className="sidebar-profile">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "white" }}>
          <ul className="navbar-nav ml-auto mr-auto side-navbar">
            <NavItem navType="sidenav-item" icon="message"/>
            <NavItem navType="sidenav-item" icon="notification"/>
            <NavProfile navType="sidenav-item" />
          </ul>
        </nav>
      </div>
    );
  }

  renderRSSLinks() {
    const { 
      errorGetRSS,
      successGetRSS,
      getRSSErrors,
      getRSSData
    } = this.props.sidebar;

    const renderLinks = () => {
      if (errorGetRSS) {
        return (<Link to="/">{getRSSErrors.msg}</Link>);
      }

      if (successGetRSS) {
        return getRSSData.map(rss => 
          <Link key={rss._id} to={"/feed/"+rss._id}>{rss.name}</Link>
        );
      }
    }

    return (
      <li className="dropdown-rss-list">
        <Link 
          to = '/'
          className="dropdown-btn-rss-list"
        >
          <i className="fas fa-link drop-icon-margin noselect"></i>
          <span className="noselect">Website</span>
        </Link>
        <div 
          className="dropdown-content-rss-list"
        >
          {renderLinks()}
        </div>
      </li>
    );
  }

  renderSidenavItem(itemName) {
    let name = '';
    if (itemName === 'ideas'){
      name = 'Bank of Ideas';
    }

    if (itemName === 'post-Content'){
      name = 'Add Content';
    }
    return (
      <li>
        <Link to = {'/'+itemName}>
          <i 
            className={classnames("fas drop-icon-margin noselect",
              {"fa-clock": itemName === 'today'},
              {"fa-bullhorn": itemName === 'translate'},
              {"fa-mouse-pointer": itemName === 'evergreen'},
              {"fa-lightbulb": itemName === 'ideas'},
              {"fa-plus": itemName === 'post-Content'},
            )}
          >
          </i>
          <span className="noselect">
            { itemName === 'ideas' || itemName === 'post-Content' ?
              name:
              capitalize(itemName)
            }
          </span>
        </Link>
      </li>
    );
  }

  renderFooter() {
    return (
      <div className="sidebar-extra-block">
        <p>
        © 2017 TIA ID. All right reserved
        </p>
      </div>
    );
  }

  renderNavigation() {
    return(
      <div className="left-navigation">
        <ul className="list">
          {this.renderSidenavItem('today')}
          {this.renderRSSLinks()}
          {this.renderSidenavItem('translate')}
          {this.renderSidenavItem('evergreen')}
          {this.renderSidenavItem('ideas')}
          {this.renderSidenavItem('post-Content')}
        </ul>
        {this.renderFooter()}
      </div>
    );
  }

  render() {
    const { md4_md8 } = this.props;
    return (
      <div className={
        "sidebar" + 
        (md4_md8 ? " col-md-4 col-sm-4" : " col-md-2 col-sm-4 ")
        }
      >
        {this.renderSidebarProfile()}
        {this.renderNavigation()}
      </div>
    )
  }
}

Sidebar.propTypes = {
  authLogin: propTypes.object.isRequired,
  sidebar: propTypes.object.isRequired,
  getRSS: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
  authLogin: state.authLogin,
  sidebar: state.sidebar
});

export default connect(mapStateToProps, { getRSS })(Sidebar);
