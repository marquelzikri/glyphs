import React, { Component } from 'react';
import './style/Headline.css';

class Headline extends Component{
  getDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
      dd = '0'+dd;
    } 

    if(mm<10) {
      mm = '0'+mm;
    }

    return today = mm + '/' + dd + '/' + yyyy;
  }

  getIcon = () => {
    const { title } = this.props;
    let icon = '';

    switch(title) {
      case 'today':
        icon = 'fa-clock';
        break;
      case 'translate':
        icon = 'fa-bullhorn';
        break;
      case 'evergreen':
        icon = 'fa-mouse-pointer';
        break;
      case 'ideas' :
        icon = 'fa-lightbulb';
        break;
      case 'profile':
        icon = 'fa-user';
        break;
      case 'website':
        icon = 'fa-link';
        break;
      default:
        icon = ''
    }
    return (<i className={"fas drop-icon-margin "+icon}></i>);
  }

  printTitle = () => {
    const { props, getDate} = this;
    const { title } = props;

    let print = '';

    title.toString() === 'today' ? 
      print = title.charAt(0).toUpperCase()+title.substr(1)+' '+getDate() : 
      print = title.charAt(0).toUpperCase()+title.substr(1)

    return print;
  }

  render() {
    const { getIcon, printTitle } = this;

    return(
      <div className="headline">
        <p>
          {getIcon()}
          {printTitle()}
        </p>
      </div>
    )
  }
}

export default Headline;