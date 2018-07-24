import {
  CONTENT_START_LOADING,
  CONTENT_FINISH_LOADING, 
  GET_CONTENTS_SUCCESS, 
  GET_CONTENTS_ERROR,
  REFRESH_STATE,
  PARSE_RSS,
  PARSE_RSS_SUCCESS,
  PARSE_RSS_ERROR,
} from '../constant';

import { 
  successGetContent,
  errorGetContent,
  refreshStates,
  parseRSS_Start,
  parseRSS_Success,
  parseRSS_Error,
} from '../util';

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTENTS_SUCCESS:
      const contentData = action.payload;
      return Object.assign({}, successGetContent(state), { contentData });
    case GET_CONTENTS_ERROR:
      const errorData = action.payload;
      return Object.assign({}, errorGetContent(state), { errorData });
    case REFRESH_STATE:
      return refreshStates(state);

    case CONTENT_START_LOADING:
      return {
        ...state,
        loading: true
      }
    case CONTENT_FINISH_LOADING:
      return {
        ...state,
        loading: false
      }

    case PARSE_RSS:
      return Object.assign({}, parseRSS_Start(state));

    case PARSE_RSS_SUCCESS:
      const parseData = action.payload;
      return Object.assign({}, parseRSS_Success(state), { parseData });

    case PARSE_RSS_ERROR:
      const parseError = action.payload;
      return Object.assign({}, parseRSS_Error(state), { parseError });
    default:
      return state;
  }
}
