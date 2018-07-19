import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getBookmarksAndAssignments, removeBookmark, removeAssignment, resetStates } from './action';

import './style/Profile.css';
import Spinner from '../Common/Spinner/Index';
import swal from 'sweetalert';

class Profile extends Component {
  constructor() {
    super();
    this.onBookmarkRemove = this.onBookmarkRemove.bind(this);
    this.onAssignmentRemove = this.onAssignmentRemove.bind(this);
  }

  componentDidMount() {
    const { getBookmarks } = this.props;
    getBookmarks();
  }

  onBookmarkRemove(e, content_id) {
    const { removeBookmark } = this.props;
    e.preventDefault();

    removeBookmark(content_id);
  }

  onAssignmentRemove(e, content_id) {
    const { removeAssignment } = this.props;
    e.preventDefault();

    removeAssignment(content_id);
  }

  renderProfile() {
    const { user } = this.props.authLogin;

    let renderAvatar = user.avatar;

    if (user.avatar) {
      if (!user.avatar.includes('https:')){
        renderAvatar = 'https:'+user.avatar
      }
    }

    return (
      <div className="profile-overview card">
        <div className="user-avatar">
          <img 
            src={renderAvatar} 
            alt="Avatar"
            width="150px" 
            height="150px"
          />
        </div>
        <p className="user-name">{user.name}</p>
      </div>
    )
  }

  renderContent = item => {
    const { getBookmarks, resetStates, profile } = this.props;
    const { 
      loadingBookmarks, 
      getBookmarksSuccess, 
      getBookmarksError, 
      bookmarks, 
      bookmarksErrors,
      loadingAssignments, 
      getAssignmentsSuccess, 
      getAssignmentsError, 
      assignments, 
      assignmentsErrors,
      removeAssignmentSuccess, 
      removeAssignmentSuccessMessage,
      removeBookmarkSuccess,
      removeBookmarkSuccessMessage,
    } = profile;

    const loadBookmarks = () => {
      if(loadingBookmarks) {
        return <Spinner />
      }else {
        if (getBookmarksError) {
          return (
            <p className="item-error">{bookmarksErrors.msg}</p>
          )
        }

        if (getBookmarksSuccess){
          return (
            bookmarks.map(bookmark => 
              <div className="item" key={bookmark._id}>
                <a href={bookmark.content_URL}>
                  <p className="item-title">{bookmark.content_title}</p>
                </a>
                <p className="item-desc">{bookmark.content_desc}</p>
                <button 
                  className="btn btn-outline-danger" 
                  onClick={e => this.onBookmarkRemove(e, bookmark.content_id)}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
                <hr/>
              </div>
            )
          )
        }
      }
    }

    const loadAssignments = () => {
      if(loadingAssignments) {
        return <Spinner />
      }else {
        if (getAssignmentsSuccess){
          return (
            assignments.map(assignment => 
              <div className="item" key={assignment._id}>
                <a href={assignment.content_URL}>
                  <p className="item-title">{assignment.content_title}</p>
                </a>
                <p className="item-desc">
                  <div className="content-innerHTML" dangerouslySetInnerHTML={{__html: assignment.content_desc}} />
                </p>
                <button 
                  className="btn btn-outline-danger" 
                  onClick={e => this.onAssignmentRemove(e, assignment.content_id)}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
                <hr/>
              </div>
            )
          )
        }

        if (getAssignmentsError) {
          return (
            <p className="item-error">{assignmentsErrors.msg}</p>
          )
        }
      }
    }

    if (removeAssignmentSuccess) {
      swal('Done!', removeAssignmentSuccessMessage, "success")
        .then(value => {
          if (value) {
            resetStates();
            getBookmarks();
          }
        })
    }

    if (removeBookmarkSuccess) {
      swal('Done!', removeBookmarkSuccessMessage, "success")
        .then(value => {
          if (value) {
            resetStates();
            getBookmarks();
          }
        })
    }

    return (
      <div className="items-wrapper card">
        {item === 'bookmarks' ?
          <h4 className="title">My Bookmarks</h4> : <h4 className="title">My Assignments</h4>
        }
        <hr className="title-content-divider" />
        <div className="items-list">
          {item === 'bookmarks' ? loadBookmarks() : loadAssignments()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="profile-page-wrapper">
        <div className="profile-page">
          {this.renderProfile()}
          {this.renderContent('bookmarks')}
          {this.renderContent('assignments')}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  authLogin: propTypes.object,
  profile: propTypes.object,
}

const mapStateToProps = state => ({
  authLogin: state.authLogin,
  profile: state.profile
})

export default connect(mapStateToProps, { getBookmarks: getBookmarksAndAssignments, removeBookmark, removeAssignment, resetStates })(Profile);