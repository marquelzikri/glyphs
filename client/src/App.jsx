import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './components/Login/action';

import './App.css';

import RedirectToHome from './RedirectToHome';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';

import ContentList from './components/ContentList';

import Login from './components/Login';
import Register from './components/Register';
import PostContent from './components/PostContent';
import Profile from './components/Profile';

// Check for token
if (localStorage.jwtToken) {
  // Set Auth token header Auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decodedData = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedData));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decodedData.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showSideBar: true,
      width: window.innerWidth
    }
    // this.updateSideBar = this.updateSideBar.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidUpdate() {
    if (window.innerWidth !== this.state.width) {
      this.setState({ width: window.innerWidth });
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
    const { width, showSideBar } = this.state;

    width < 600?
    this.setState({ showSideBar: !showSideBar })
    : this.setState({ showSideBar: true })
  };

  render() {
    const { width, showSideBar } = this.state;
    const md4_md8 = width <= 1017;

    const updateSideBar = () => {
      width < 600?
      this.setState({ showSideBar: !showSideBar })
      : this.setState({ showSideBar: true })
    }

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path='/' component = { RedirectToHome } />
            <Route path='/login' component = { Login } />
            <Route path='/register' component = { Register } />
            {/* Navbar */}
            <Route 
              exact path = '/(today|translate|evergreen|ideas|post-content|profile|feed)/:feed_id?' 
              render = { (props) => 
                <Navbar 
                  showSidebar={ updateSideBar } 
                  md4_md8={md4_md8}
                /> 
              } 
            />
            <div className="container-fluid">
              <div className="row">
                {/* Sidebar */}
                {showSideBar ? <Route exact path = '/(today|translate|evergreen|ideas|post-content|profile|feed)/:feed_id?' render = { (props) => <Sidebar md4_md8={md4_md8} /> } /> : '' } 
                {/* Main */}
                <div 
                  className = 
                    {"main-content"
                      + (showSideBar && !md4_md8 ? " col-md-10 col-sm-8" : "") 
                      + (showSideBar && md4_md8 ? " col-md-8 col-sm-8" : "")
                    }
                >
                  <Switch>
                    <Route 
                      exact path='/today'
                      render = {(props) => <ContentList headline='today' showSidebar={showSideBar} />} 
                    />
                    <Route 
                      exact path='/translate'
                      render = {(props) => <ContentList headline='translate' /> } 
                    />
                    <Route 
                      exact path='/evergreen'
                      render = {(props) => <ContentList headline='evergreen' /> } 
                    />
                    <Route 
                      exact path='/ideas'
                      render = {(props) => <ContentList headline='ideas' /> } 
                    />
                    <Route 
                      exact path='/profile'
                      component={Profile}
                      // render = {(props) => <Profile headline='profile' /> } 
                    />
                    <Route 
                      exact path='/feed/:feed_id?'
                      render = {(props) => <ContentList headline='website' /> } 
                    />
                    <Route path='/post-content' component = { PostContent }/>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
