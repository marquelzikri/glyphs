import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Spinner from '../Common/Spinner/Index';

import { getContents, parseRSS } from './action';
import propTypes from 'prop-types';

import Content from './Content';
import Headline from '../Layout/Headline/Headline';

import './styles/Content.css';
import './styles/Scrollbar.css';

class ContentList extends Component {
  state = {
    title: '',
    isMounted: false,
  } 

  loadData() {
    const { headline, getContents } = this.props;
    const url_path = window.location.pathname.substring(1, 5);
    const feed_id = window.location.pathname.substring(6, window.location.pathname.length);
      if (url_path === 'feed'){
        getContents('rss', feed_id);
      }else{
        getContents(headline, '');
      }
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
    if (navigator.onLine) {
      this.loadData();
    }else{
      window.location.href = '/login';
    }
  }

  componentDidUpdate() {
    const { headline } = this.props;
    if (this.state.title !== headline){
      this.setState({title: headline});
      this.loadData();
    }
  }

  componentWillUnmount(){
    this.setState({
      isMounted: false,
    })
  }

  renderContent = () => {
    const { 
      contentData, 
      errorData, 
      error, 
      success, 
      loading,

      parsing,
      parsingError,
      parsingSuccess,
      parseError,
      parseData
    } = this.props.content;

    // Content
    if (loading || parsing) {
      return (
        <Spinner />
      );
    } 

    if (error) {
      return (
        <div className="no-content-wrapper">
          <p className="no-content">{errorData.msg}</p>
        </div>
      );
    }

    if(success){
      return contentData.map(item =>
        <Content
          key={item._id} 
          id={item._id} 
          url = {item.URL}
          title={item.title}
          desc={item.desc}
          date={item.date.toString().substring(0, 10)}
        /> 
      );
    }

    // RSS feed
    if (parsingError) {
      return (
        <div className="no-content-wrapper">
          <p className="no-content">{parseError.msg}</p>
        </div>
      );
    }

    if(parsingSuccess){
      return parseData.map(item =>
        <Content
          key={item._id} 
          id={item._id} 
          url = {item.URL}
          title={item.title}
          desc={item.desc}
          date={item.date.toString().substring(0, 10)}
        /> 
      );
    }

    return; 
  }

  render(){
    const { renderContent } = this;
    const { headline, showSidebar } = this.props;

    document.body.style.overflow = "hidden";

    return(
      <div className="contentwrapper">
        <Headline title={headline} />
        <div className={classnames("content",
            {" noSidebar": showSidebar}
          )}
        >
          <p className="content-separator"></p>
          {renderContent()}
        </div>
      </div>
    )
  }
}

ContentList.propTypes = {
  getContents: propTypes.func.isRequired,
  content: propTypes.object.isRequired,
  parseRSS: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
  content: state.content
})

export default connect(mapStateToProps, { getContents, parseRSS })(ContentList);
