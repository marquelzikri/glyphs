import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addContent, addFeed, checkURL, refreshStates } from './action';
import Spinner from '../Common/Spinner';

import swal from 'sweetalert';

import './style/Post-Content.css';

class PostContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: '',
      category: '',
      RSSname: '',
      errors: {}
    }

    const { refreshStates } = this.props;
    refreshStates();

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputURLChange = this.onInputURLChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.renderCategoryButton = this.renderCategoryButton.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onInputURLChange(e) {
    this.onInputChange(e);

    const { checkURL } = this.props;
    const url = e.target.value;
    if (url !== '') {
      checkURL({URL:url});
    }
  }

  onSubmit(e) {
    const { RSSname, URL, category } = this.state;
    const { addContent, addFeed } = this.props;

    e.preventDefault();

    if (category === 'RSS') {
      addFeed({ name: RSSname, URL });
    }else {
      const newContent = {
        URL: URL,
        category: category
      }

      addContent(newContent);
    }

    this.renderAlert();
  }

  onCategoryChange(e) {
    e.preventDefault();
    this.setState({ category: e.target.value });
  }

  renderAlert() {
    const { category } = this.state;
    const { refreshStates, postContent } = this.props;
    const { 
      uploadErrorData, 
      uploadedContent, 
      feedData, 
      addFeedErrorsData, 
      error, 
      success,
    } = postContent;

    if (error && uploadErrorData) {
      return (
        swal("Failed to add new Content", uploadErrorData.category, "error")
          .then(value => {
            if (value) {
              refreshStates();
              this.setState({ URL: '', category: '' });
            }
          })
      );
    }

    if (success && uploadedContent) {
      return (
        swal("New Content added.", uploadedContent.title, "success")
          .then(value => {
            if (value) {
              refreshStates();
              window.location.href = '/'+category
            }
          })
      );
    }

    if (error && addFeedErrorsData) {
      return (
        swal("Failed to add new feed url", uploadErrorData.msg, "error")
          .then(value => {
            if (value) {
              refreshStates();
              this.setState({ URL: '', name: '' });
            }
          })
      );
    }

    if (success && feedData) {
      return (
        swal("New feed url added.", feedData.name, "success")
          .then(value => {
            if (value) {
              refreshStates();
              window.location.href = '/today'
            }
          })
      );
    }
  }

  renderInput(type) {
    const { errors, URL, category, RSSname } = this.state;
    const { onInputChange, onInputURLChange } = this;
    return (
      <div className={classnames("form-group", {
          "hidden":(category !== 'RSS')&&(type==='rss')
        }
      )}>
        <h5 className="card-title">
          {type === 'url' ? 'Insert URL or RSS link:' : 'Feed name:'}
        </h5>
        <input 
          id={type === 'url' ? 'URL' : 'RSSname'}
          name={type === 'url' ? 'URL' : 'RSSname'}
          type="text" 
          autoComplete="off"
          className={classnames("form-control", {
              " is-invalid":(errors.URL) && (type==='url')
            }
          )}
          value={type === 'url' ? URL : RSSname}
          onChange={type === 'url' ? onInputURLChange : onInputChange}
          required
        />
      </div>
    );
  }

  renderCategoryButton(name) {
    // First letter of 'name' variable must be capital.
    return (
      <button 
        type='button'
        name={name === 'Bank of Ideas' ? 'Ideas' : name}
        value={name === 'Bank of Ideas' ? 'Ideas' : name}
        className={classnames("btn btn-light btn-category", 
          {
            "active btn-lg btn-outline-danger": this.state.category === (name === 'Bank of Ideas' ? 'Ideas' : name)
          }
        )}
        onClick={(e) => this.onCategoryChange(e)}
      >
        {name}
      </button>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidUpdate() {
    const { 
      successloadURL,
      errorloadURL,
      isRSS,
      title
    } = this.props.postContent;
    const { category } = this.state;

    if (successloadURL && isRSS) {
      // if contains feeds
      if (this.state.RSSname !== title && category !== 'RSS') {
        this.setState({ RSSname: title, category: 'RSS' });
      }
    }

    if (errorloadURL && !isRSS) {
      // if not contains feeds
      if (this.state.RSSname !== title) {
        this.setState({ RSSname: title, category: '' });
      }
    }
  }

  render() {
    const { category  } = this.state;
    const { onSubmit, renderCategoryButton } = this;
    const { loadingAddContent, loadingURLStatus, addFeedLoading } = this.props.postContent;

    document.body.style.overflow = "hidden"; // Disable scroll

    this.renderAlert();

    return (
      <div className="post-content">
        <div className="card post-form">
          <div className="card-header post-header" style={{ textAlign: "center" }}>
            Create new content
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              {this.renderInput('url')}
              {category === 'RSS' ?
                this.renderInput('rss') : ''
              }
              <div className={classnames("categories-container", {
                "hidden": category === 'RSS'
              })}>
                <h5>Choose category:</h5>
                <div className="btn-category-wrapper">
                  {renderCategoryButton('Today')}
                  {renderCategoryButton('Translate')}
                  {renderCategoryButton('Evergreen')}
                  {renderCategoryButton('Bank of Ideas')}
                </div>
              </div>
              <hr/>

              {loadingAddContent || loadingURLStatus || addFeedLoading ? 
                <Spinner /> :
                <button className="btn btn-danger" style={{ width: "100%" }}>Create</button>
              }
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PostContent.propTypes = {
  addContent: propTypes.func.isRequired,
  refreshStates: propTypes.func.isRequired,
  postContent: propTypes.object.isRequired,
  authLogin: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  authLogin: state.authLogin,
  postContent: state.postContent,
  errors: state.errors
})

export default connect(mapStateToProps, { addContent, addFeed, checkURL, refreshStates })(PostContent);