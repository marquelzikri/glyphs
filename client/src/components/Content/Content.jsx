import React, { Component } from 'react';
import { 
  addBookmark, 
  removeBookmark, 
  assignMe, 
  unAssignMe 
} from './action';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import classnames from 'classnames';
import axios from 'axios';
import isEmpty from '../../validation/is-empty';

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

  onBookmarkClick() {
    if (this.state.isBookmarked){
      this.setState({ isBookmarked: false });
      this.props.removeBookmark(this.props.id);
    }else{
      this.setState({ isBookmarked: true });
      this.props.addBookmark(this.props.id);
    }
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
  }

  fetchContentMeta() {
    if (this.props.content.parsingSuccess) {
      // Temporary
      return null;
    }

    const { user } = this.props.authLogin;
    // eslint-disable-next-line
    this.props.content.contentData.map(content => {
      // eslint-disable-next-line
      content.bookmarks.map(bookmark => {
        if (bookmark.user.toString() === user.id.toString() & content._id===this.props.id) {
          this.setState({ isBookmarked: true });
        }
      })

      // Assign to button
      if (!isEmpty(content.assignTo) & content._id === this.props.id) {
        this.setState({ assignTo: content.assignTo });
        axios
          .get('/api/users/user_info/'+content.assignTo.toString())
          .then(res=> {
            this.setState({ assignToAvatar: res.data.avatar })
            this.setState({ assignToName: res.data.name })
          })
      }
    });
  }

  componentDidMount() {
    this.fetchContentMeta();
  }

  render(){
    const { url, title, desc, date, authLogin } = this.props;
    const { assignTo, assignToAvatar, assignToName, isBookmarked } = this.state;
    const { onAssignButtonClick, onBookmarkClick } = this;

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

export default connect(mapStateToProps, { addBookmark, removeBookmark, assignMe, unAssignMe })(Content);