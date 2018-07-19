import axios from 'axios';

import { 
  ADD_BOOKMARK, 
  REMOVE_BOOKMARK, 

  ASSIGN_ME,
  UN_ASSIGN_ME,

  GET_CONTENTS,
  GET_CONTENTS_SUCCESS,
  GET_CONTENTS_ERROR,

  CONTENT_START_LOADING,
  CONTENT_FINISH_LOADING,

  REFRESH_STATE,
  PARSE_RSS,
  PARSE_RSS_SUCCESS,
  PARSE_RSS_ERROR,
} from '../constant';

import call from '../api';

export const refreshStates = () => {
  return {
    type: REFRESH_STATE
  }
}

// Get Content
export const getContents = (category, feed_id) => {
  // dispatch(startContentLoading());
  // call.getContents(category).then(res => { 
  //   dispatch(finishContentLoading());
  //   dispatch(getContentsSuccess(res.data));
  // })
  // .catch(err => {
  //   dispatch(finishContentLoading());
  //   dispatch(getContentsError(err.response.data));
  // })
  return async dispatch => {
    dispatch({type:GET_CONTENTS});
    dispatch(startContentLoading());
    
    const response = await call.getContents(category, feed_id);

    if (response.msg === 'success') {
      dispatch(getContentsSuccess(response.data));
      dispatch(finishContentLoading());
    }
    if (response.msg === 'error') {
      dispatch(getContentsError(response.data));
      dispatch(finishContentLoading());
    }
  }
}

export const getContentsSuccess = contents => {
  return {
    type: GET_CONTENTS_SUCCESS,
    payload: contents
  }
}

export const getContentsError = errors => {
  return {
    type: GET_CONTENTS_ERROR,
    payload: errors
  }
}

// Set loading state
export const startContentLoading = () => {
  return {
    type: CONTENT_START_LOADING
  };
};

// Set loading state
export const finishContentLoading = () => {
  return {
    type: CONTENT_FINISH_LOADING
  };
};

// Parse RSS to contents
export const parseRSS = feed_id => {
  return async dispatch => {
    dispatch({type:PARSE_RSS});
    
    const response = await call.parseRSS(feed_id);

    if (response.msg === 'success') {
      dispatch(parseRSS_Success(response.data));
    }
    if (response.msg === 'error') {
      dispatch(parseRSS_Error(response.data));
    }
  }
}

export const parseRSS_Success = data => {
  return {
    type: PARSE_RSS_SUCCESS,
    payload: data
  }
}

export const parseRSS_Error = error => {
  return {
    type: PARSE_RSS_ERROR,
    payload: error
  }
}

// Add bookmark on a Content
export const addBookmark = contentID => dispatch => {
  axios
    .post('/api/contents/bookmark/'+contentID)
    .then(res => {
      dispatch({
        type: ADD_BOOKMARK,
        payload: res.data
      })
    })
    .catch(err =>{
      dispatch({
        type: ADD_BOOKMARK,
        payload: err.response
      })
    });
}

// Remove bookmark from a Content
export const removeBookmark = contentID => dispatch => {
  axios
    .post('/api/contents/bookmark/remove/'+contentID)
    .then(res => {
      dispatch({
        type: REMOVE_BOOKMARK,
        payload: res.data
      })
    })
    .catch(err =>{
      dispatch({
        type: REMOVE_BOOKMARK,
        payload: err.response
      })
    });
}

export const assignMe = contentID => dispatch => {
  axios
    .post('/api/contents/assign/me/' + contentID)
    .then(res => {
      dispatch({
        type: ASSIGN_ME,
        payload: res.data.assignTo
      })
    })
    .catch(err => {
      dispatch({
        type: ASSIGN_ME,
        payload: err
      })
    });
}

export const unAssignMe = contentID => dispatch => {
  axios
    .post('/api/contents/un_assign/me/' + contentID)
    .then(res => {
      dispatch({
        type: UN_ASSIGN_ME,
        payload: res.data.assignTo
      })
    })
    .catch(err => {
      dispatch({
        type: UN_ASSIGN_ME,
        payload: err
      })
    });
}
