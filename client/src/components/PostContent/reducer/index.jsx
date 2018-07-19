import {
  ADD_CONTENT_SUCCESS,
  ADD_CONTENT_ERROR,
  REFRESH_STATE,
  ADD_FEED,
  ADD_FEED_SUCCESS,
  CHECK_URL,
  CHECK_URL_SUCCESS,
  CHECK_URL_ERROR,
  ADD_FEED_ERROR,
  ADD_CONTENT
} from '../constant';

import { 
  startAddContent,
  successAddContent,
  errorAddContent,

  refreshStates,

  startAddFeed,
  successAddFeed,
  errorAddFeed,

  startCheckURL,
  successCheckURL,
  errorCheckURL
} from '../util';

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTENT:
    return Object.assign({}, startAddContent(state));
    case ADD_CONTENT_SUCCESS:
      const uploadedContent = action.payload;
      return Object.assign({}, successAddContent(state), { uploadedContent });
    case ADD_CONTENT_ERROR:
      const uploadErrorData = action.payload;
      return Object.assign({}, errorAddContent(state), { uploadErrorData });

    case ADD_FEED:
      return Object.assign({}, startAddFeed(state));
    case ADD_FEED_SUCCESS:
      const feedData = action.payload;
      return Object.assign({}, successAddFeed(state), { feedData });
    case ADD_FEED_ERROR:
      const addFeedErrorsData = action.payload;
      return Object.assign({}, errorAddFeed(state), { addFeedErrorsData });

    case CHECK_URL:
      return Object.assign({}, startCheckURL(state));
    case CHECK_URL_SUCCESS:
      const title = action.payload
      return Object.assign({}, successCheckURL(state), { title });
    case CHECK_URL_ERROR:
      return Object.assign({}, errorCheckURL(state));

    case REFRESH_STATE:
      return refreshStates(state);
    default:
      return state;
  }
}
