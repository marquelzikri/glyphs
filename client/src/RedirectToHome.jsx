import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class RedirectToHome extends Component {
  render() {
    return (
      <div>
        <Redirect to='/today'/>
      </div>
    )
  }
}

export default RedirectToHome;