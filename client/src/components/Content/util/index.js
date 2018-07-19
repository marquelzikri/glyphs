const startGetContent = state => ({
  error: false,
  success: false,
  errorData: {},
  contentData: {}
});

const successGetContent = state => ({
  error: false,
  success: true,
  errorData: {},
  contentData: {}
});

const errorGetContent = state => ({
  error: true,
  success: false,
  errorData: {},
  contentData: {}
});

const startAddContent = state => ({
  error: false,
  success: false,
  uploadErrorData: {},
  uploadedContent: {}
});

const successAddContent = state => ({
  error: false,
  success: true,
  uploadErrorData: {},
  uploadedContent: {}
});

const errorAddContent = state => ({
  error: true,
  success: false,
  uploadErrorData: {},
  uploadedContent: {}
});

const startAddFeed = state => ({
  addFeedLoading: true,
  success: false,
  error: false,
  feedData: {},
  addFeedErrorsData: {}
});

const successAddFeed = state => ({
  addFeedLoading: false,
  success: true,
  error: false,
  feedData: {},
  addFeedErrorsData: {}
});

const errorAddFeed = state => ({
  addFeedLoading: false,
  success: false,
  error: true,
  feedData: {},
  addFeedErrorsData: {}
});

const startCheckURL = state => ({
  loadingURLStatus: true,
  successloadURL: false,
  errorloadURL: false,
  isRSS: false,
  title: ''
});

const successCheckURL = state => ({
  loadingURLStatus: false,
  successloadURL: true,
  errorloadURL: false,
  isRSS: true,
  title: ''
});

const errorCheckURL = state => ({
  loadingURLStatus: false,
  successloadURL: false,
  errorloadURL: true,
  isRSS: false,
  title: ''
});

const isEmpty = value => 
  value === undefined || 
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

const refreshStates = state => ({
  error: false,
  success: false,
  uploadErrorData: {},
  uploadedContent: {},
  errorData: {},
  contentData: {}
});

const parseRSS_Start = state => ({
  parsing: true,
  parsingError: false,
  parsingSuccess: false,
  parseError: {},
  parseData: {}
});

const parseRSS_Success = state => ({
  parsing: false,
  parsingError: false,
  parsingSuccess: true,
  parseError: {},
  parseData: {}
});

const parseRSS_Error = state => ({
  parsing: false,
  parsingError: true,
  parsingSuccess: false,
  parseError: {},
  parseData: {}
});

export {
  startGetContent,
  successGetContent,
  errorGetContent,
  startAddContent,
  successAddContent,
  errorAddContent,
  startAddFeed,
  successAddFeed,
  errorAddFeed,
  startCheckURL,
  successCheckURL,
  errorCheckURL,
  isEmpty,
  refreshStates,
  parseRSS_Start,
  parseRSS_Success,
  parseRSS_Error,
}
