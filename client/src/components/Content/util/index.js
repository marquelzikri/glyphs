const isEmpty = value => 
  value === undefined || 
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

const startBookmarkContent = state => ({
  isBookmarking: true, // loading
  bookmarkSuccess: false,
  bookmarkError: false,
  bookmarkedSuccessMessage: {},
  bookmarkedErrorMessage: {}
});

const successBookmarkContent = state => ({
  isBookmarking: false, // loading
  bookmarkSuccess: true,
  bookmarkError: false,
  bookmarkedSuccessMessage: {},
  bookmarkedErrorMessage: {}
});

const errorBookmarkContent = state => ({
  isBookmarking: false, // loading
  bookmarkSuccess: false,
  bookmarkError: true,
  bookmarkedSuccessMessage: {},
  bookmarkedErrorMessage: {}
});

const startRemoveBookmark = state => ({
  removingBookmark: true, // loading
  removeBookmarkSuccess: false,
  removeBookmarkError: false,
  removeBookmarkSuccessMessage: {},
  removeBookmarkErrorMessage: {},
});

const successRemoveBookmark = state => ({
  removingBookmark: false, // loading
  removeBookmarkSuccess: true,
  removeBookmarkError: false,
  removeBookmarkSuccessMessage: {},
  removeBookmarkErrorMessage: {},
});

const errorRemoveBookmark = state => ({
  removingBookmark: false, // loading
  removeBookmarkSuccess: false,
  removeBookmarkError: true,
  removeBookmarkSuccessMessage: {},
  removeBookmarkErrorMessage: {},
});

const startAssignContent = state => ({
  assigningContent: true, // loading
  assignSuccess: false,
  assignError: false,
  assignContentSuccessMessage: {},
  assignContentErrorMessage: {}
});

const successAssignContent = state => ({
  assigningContent: false, // loading
  assignSuccess: true,
  assignError: false,
  assignContentSuccessMessage: {},
  assignContentErrorMessage: {}
});

const errorAssignContent = state => ({
  assigningContent: false, // loading
  assignSuccess: false,
  assignError: true,
  assignContentSuccessMessage: {},
  assignContentErrorMessage: {}
});

const startRemoveAssignment = state => ({
  removingAssignment: true, // loading
  removeAssignmentSuccess: false,
  removeAssignmentError: false,
  removeAssignmentSuccessMessage: {},
  removeAssignmentErrorMessage: {},
});

const successRemoveAssignment = state => ({
  removingAssignment: false, // loading
  removeAssignmentSuccess: true,
  removeAssignmentError: false,
  removeAssignmentSuccessMessage: {},
  removeAssignmentErrorMessage: {},
});

const errorRemoveAssignment = state => ({
  removingAssignment: false, // loading
  removeAssignmentSuccess: false,
  removeAssignmentError: true,
  removeAssignmentSuccessMessage: {},
  removeAssignmentErrorMessage: {},
});

export {
  isEmpty,

  startBookmarkContent,
  successBookmarkContent,
  errorBookmarkContent,

  startRemoveBookmark,
  successRemoveBookmark,
  errorRemoveBookmark,

  startAssignContent,
  successAssignContent,
  errorAssignContent,

  startRemoveAssignment,
  successRemoveAssignment,
  errorRemoveAssignment
}
