import React, { Component } from 'react';
import { 
  bookmarkContent,
  removeBookmark, 
  assignContent,
  removeAssignment
} from './action';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import classnames from 'classnames';
import axios from 'axios';
import isEmpty from '../../validation/is-empty';

import Loader from '../Common/Loader'

import swal from 'sweetalert';

import './styles/Content.css';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      isBookmarked: false,
      assignTo: '',
      assignToAvatar: '',
      assignToName: ''
    }

    this.onBookmarkClick = this.onBookmarkClick.bind(this);
    this.onAssignButtonClick = this.onAssignButtonClick.bind(this);
  }

  componentDidMount() {
    const { bookmarks, assignTo, authLogin } = this.props;
    const { user } = authLogin;
    // eslint-disable-next-line 
    bookmarks.map(bookmark => {
      if (bookmark.user === user.id) {
        this.setState({isBookmarked:true})
      }
    });
    if (assignTo === user.id) {
      this.setState({assignTo: user.id})
      axios
        .get('/api/users/user_info/' + user.id)
        .then(res=> {
          let renderAvatar = res.data.avatar;

          if (res.data.avatar) {
            if (!res.data.avatar.includes('https:')){
              renderAvatar = 'https:'+res.data.avatar
            }
          }
          this.setState({ assignToAvatar: renderAvatar })
          this.setState({ assignToName: res.data.name })
        });
    }
  }

  componentDidUpdate() {
    this.renderAlert();
  }

  onBookmarkClick() {
    this.setState({ isBookmarked: !this.state.isBookmarked });
    if (this.state.isBookmarked){
      this.props.removeBookmark(this.props.id);
    }else{
      this.props.addBookmark(this.props.id);
    }
    this.renderAlert();
  }

  onAssignButtonClick() {
    const { id, authLogin, assignMe, unAssignMe } = this.props;
    const { user } = authLogin;
    
    if (this.state.assignTo === ''){
      this.setState({ assignTo: user.id });
      axios
        .get('/api/users/user_info/' + user.id)
        .then(res=> {
          let renderAvatar = res.data.avatar;

          if (res.data.avatar) {
            if (!res.data.avatar.includes('https:')){
              renderAvatar = 'https:'+res.data.avatar
            }
          }
          this.setState({ assignToAvatar: renderAvatar })
          this.setState({ assignToName: res.data.name })
        });
      assignMe(id);
    }else{
      this.setState({ assignTo: '' });
      this.setState({ assignToAvatar: '' })
      this.setState({ assignToName: '' })
      unAssignMe(id);
    }
    this.renderAlert();
  }

  renderAlert() {
    const { 
      isBookmarking, 
      bookmarkedSuccessMessage,

      removingBookmark,
      removeBookmarkSuccessMessage,

      assigningContent,
      assignContentSuccessMessage,

      removingAssignment,
      removeAssignmentSuccessMessage
    } = this.props.content;

    if (!isBookmarking && bookmarkedSuccessMessage) {
      return (
        swal(bookmarkedSuccessMessage, "", "success")
      );
    }

    if (!removingBookmark && removeBookmarkSuccessMessage) {
      return (
        swal(removeBookmarkSuccessMessage, "", "success")
      );
    }

    if (!assigningContent && assignContentSuccessMessage) {
      return (
        swal(assignContentSuccessMessage, "", "success")
      );
    }

    if (!removingAssignment && removeAssignmentSuccessMessage) {
      return (
        swal(removeAssignmentSuccessMessage, "", "success")
      );
    }
  }

  render(){
    const { url, title, desc, date, authLogin, content } = this.props;
    const { assignTo, assignToAvatar, assignToName, isBookmarked } = this.state;
    const { onAssignButtonClick, onBookmarkClick } = this;
    const { isBookmarking, removingBookmark } = content;

    return(
      <div className="card content-card">
        <div className="card-body">
          <h5 className="content-title">
            <a href={url}>
              {title}
            </a>
          </h5>
          <p className="content-desc content-innerHTML" dangerouslySetInnerHTML={{__html: desc}} />
          <p className="date-posted">
            {date}
          </p>

          <div className="lower-buttons">
            {isEmpty(assignTo)? 
              <button 
                className="btn btn-outline-secondary btn-assign"
                onClick={onAssignButtonClick}
              >
                  <i className="far fa-edit"></i>
                  <span className="btn-text">Assign to me</span>
              </button>
              : 
              <div className="assignTo-wrapper">
                <p className="assignTo">Assigned to:</p>
                <img 
                  src={!assignToAvatar.includes('https:') ?
                    "https:"+assignToAvatar : assignToAvatar
                  } 
                  alt="" 
                  width="30px" 
                  height="30px"
                  className="assignToAvatar"
                />
                <p className="assignToName">{assignToName}</p>
                {assignTo === authLogin.user.id ? 
                  <a onClick={onAssignButtonClick} className="un-assign-btn">unAssign</a> : ''
                }
              </div>
            }

            <div className="divider"/>

            {isBookmarking || removingBookmark?
              <Loader /> :
              <button 
              className=
              {classnames("btn btn-outline-danger btn-bookmark", 
                {
                  'active': isBookmarked
                }) 
              }
              onClick={onBookmarkClick}
            >
              <i className="far fa-bookmark"></i>
            </button> 
            }
          </div>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  addBookmark: propTypes.func.isRequired,
  removeBookmark: propTypes.func.isRequired,
  assignMe: propTypes.func.isRequired,
  unAssignMe: propTypes.func.isRequired,
  content: propTypes.object.isRequired,
  authLogin: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  content: state.content,
  authLogin: state.authLogin
});

export default connect(mapStateToProps, { addBookmark: bookmarkContent, removeBookmark, assignMe: assignContent, unAssignMe: removeAssignment })(Content);