import { 
  ADD_CONTENT,
  ADD_CONTENT_SUCCESS,
  ADD_CONTENT_ERROR,

  REFRESH_STATE,
  ADD_FEED,
  ADD_FEED_SUCCESS,
  ADD_FEED_ERROR,
  CHECK_URL,
  CHECK_URL_SUCCESS,
  CHECK_URL_ERROR
} from '../constant';

import call from '../api';

// Add Content
export const addContent = contentData => {
  return async dispatch => {
    dispatch({ type: ADD_CONTENT });

    const response = await call.addContent(contentData);

    if (response.msg === 'success'){
      dispatch(addContentSuccess(response.data));
    }else {
      dispatch(addContentError(response.data));
    }
  }
};

export const addContentSuccess = content => {
  return {
    type: ADD_CONTENT_SUCCESS,
    payload: content
  }
};

export const addContentError = error => {
  return {
    type: ADD_CONTENT_ERROR,
    payload: error
  }
};

export const refreshStates = () => {
  return {
    type: REFRESH_STATE
  }
}

// Add Feed URL
export const addFeed = feedData => {
  return async dispatch => {
    dispatch({ type: ADD_FEED });

    const response = await call.addFeed(feedData);

    if (response.msg === 'success'){
      dispatch(addFeedSuccess(response.data));
    }else {
      dispatch(addFeedError(response.data));
    }
  }
}

export const addFeedSuccess = feed => {
  return {
    type: ADD_FEED_SUCCESS,
    payload: feed
  }
}

export const addFeedError = errors => {
  return {
    type: ADD_FEED_ERROR,
    payload: errors
  }
}

// Check if URL contains feed
export const checkURL = URL => {
  return async dispatch => {
    dispatch({ type: CHECK_URL });

    const response = await call.checkURL(URL);

    if (response.msg === 'success') {
      dispatch(checkURLSuccess(response.data))
    }else {
      dispatch(checkURLError(response.data));
    }
  }
}

export const checkURLSuccess = data => {
  return {
    type: CHECK_URL_SUCCESS,
    payload: data.title
  }
}

export const checkURLError = errors => {
  return {
      type: CHECK_URL_ERROR,
      payload: errors
    }
}
