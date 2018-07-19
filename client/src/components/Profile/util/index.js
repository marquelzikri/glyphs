const startGetBookmarksAndAssignments = state => ({
  loadingBookmarks: true,
  getBookmarksError: false,
  getBookmarksSuccess: false,
  bookmarksErrors: {},
  bookmarks: {},

  loadingAssignments: true,
  getAssignmentsError: false,
  getAssignmentsSuccess: false,
  assignmentsErrors: {},
  assignments: {}
});

const successGetBookmarksAndAssignments = state => ({
  loadingBookmarks: false,
  getBookmarksError: false,
  getBookmarksSuccess: true,
  bookmarksErrors: {},
  bookmarks: {},

  loadingAssignments: false,
  getAssignmentsError: false,
  getAssignmentsSuccess: true,
  assignmentsErrors: {},
  assignments: {}
});

const errorGetBookmarksAndAssignments = state => ({
  loadingBookmarks: false,
  getBookmarksError: true,
  getBookmarksSuccess: false,
  bookmarksErrors: {},
  bookmarks: {},

  loadingAssignments: false,
  getAssignmentsError: true,
  getAssignmentsSuccess: false,
  assignmentsErrors: {},
  assignments: {}
});

const errorGetBookmarksAndSuccessGetAssignments = state => ({
  loadingBookmarks: false,
  getBookmarksError: true,
  getBookmarksSuccess: false,
  bookmarksErrors: {},
  bookmarks: {},

  loadingAssignments: false,
  getAssignmentsError: false,
  getAssignmentsSuccess: true,
  assignmentsErrors: {},
  assignments: {}
});

const successGetBookmarksAndErrorGetAssignments = state => ({
  loadingBookmarks: false,
  getBookmarksError: false,
  getBookmarksSuccess: true,
  bookmarksErrors: {},
  bookmarks: {},

  loadingAssignments: false,
  getAssignmentsError: true,
  getAssignmentsSuccess: false,
  assignmentsErrors: {},
  assignments: {}
});

const startRemoveBookmark = state => ({
  loadingBookmarks: true,
  removeBookmarkError: false,
  removeBookmarkSuccess: false,
  removeBookmarkErrorMessage: {},
  removeBookmarkSuccessMessage: {}
});

const successRemoveBookmark = state => ({
  loadingBookmarks: false,
  removeBookmarkError: false,
  removeBookmarkSuccess: true,
  removeBookmarkErrorMessage: {},
  removeBookmarkSuccessMessage: {}
});

const errorRemoveBookmark = state => ({
  loadingBookmarks: false,
  removeBookmarkError: true,
  removeBookmarkSuccess: false,
  removeBookmarkErrorMessage: {},
  removeBookmarkSuccessMessage: {}
});

const startRemoveAssignment = state => ({
  loadingAssignments: true,
  removeAssignmentError: false,
  removeAssignmentSuccess: false,
  removeAssignmentErrorMessage: {},
  removeAssignmentSuccessMessage: {}
});

const successRemoveAssignment = state => ({
  loadingAssignments: false,
  removeAssignmentError: false,
  removeAssignmentSuccess: true,
  removeAssignmentErrorMessage: {},
  removeAssignmentSuccessMessage: {}
});

const errorRemoveAssignment = state => ({
  loadingAssignments: false,
  removeAssignmentError: true,
  removeAssignmentSuccess: false,
  removeAssignmentErrorMessage: {},
  removeAssignmentSuccessMessage: {}
});

export {
  startGetBookmarksAndAssignments,
  successGetBookmarksAndAssignments,
  errorGetBookmarksAndAssignments,
  successGetBookmarksAndErrorGetAssignments,
  errorGetBookmarksAndSuccessGetAssignments,
  startRemoveBookmark,
  successRemoveBookmark,
  errorRemoveBookmark,
  startRemoveAssignment,
  successRemoveAssignment,
  errorRemoveAssignment,
}