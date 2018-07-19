const startAddContent = state => ({
  loadingAddContent: true,
  error: false,
  success: false,
  uploadErrorData: {},
  uploadedContent: {}
});

const successAddContent = state => ({
  loadingAddContent: false,
  error: false,
  success: true,
  uploadErrorData: {},
  uploadedContent: {}
});

const errorAddContent = state => ({
  loadingAddContent: false,
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
})

export {
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
  refreshStates
}
