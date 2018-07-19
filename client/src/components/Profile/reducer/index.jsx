import {
  GET_BOOKMARKS_AND_ASSIGNMENTS,
  GET_BOOKMARKS_AND_ASSIGNMENTS_SUCCESS,
  GET_BOOKMARKS_AND_ASSIGNMENTS_ERROR,
  GET_BOOKMARKS_ERROR_AND_ASSIGNMENTS_SUCCESS,
  GET_BOOKMARKS_SUCCESS_AND_ASSIGNMENTS_ERROR,

  REMOVE_BOOKMARK,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_ERROR,

  REMOVE_ASSIGNMENT,
  REMOVE_ASSIGNMENT_SUCCESS,
  REMOVE_ASSIGNMENT_ERROR,
  RESET
} from '../constant';

import { 
  startGetBookmarksAndAssignments,
  successGetBookmarksAndAssignments,
  errorGetBookmarksAndAssignments,
  startRemoveBookmark,
  successRemoveBookmark,
  errorRemoveBookmark,
  errorGetBookmarksAndSuccessGetAssignments,
  successGetBookmarksAndErrorGetAssignments,
  startRemoveAssignment,
  successRemoveAssignment,
  errorRemoveAssignment
} from '../util';

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  let assignments = {};
  let bookmarks = {};
  let bookmarksErrors = {};
  let assignmentsErrors = {};

  switch (action.type) {
    case GET_BOOKMARKS_AND_ASSIGNMENTS:
      return Object.assign({}, startGetBookmarksAndAssignments(state), { bookmarksErrors, bookmarks });
    case GET_BOOKMARKS_AND_ASSIGNMENTS_SUCCESS:
      bookmarks = action.payload.bookmarksSuccess;
      assignments = action.payload.assignmentsSuccess;
      return Object.assign({}, successGetBookmarksAndAssignments(state), { bookmarks, assignments })
    case GET_BOOKMARKS_AND_ASSIGNMENTS_ERROR:
      bookmarksErrors = action.payload.bookmarksErrors;
      assignmentsErrors = action.payload.assignmentsErrors;
      return Object.assign({}, errorGetBookmarksAndAssignments(state), { bookmarksErrors, assignmentsErrors });
    case GET_BOOKMARKS_ERROR_AND_ASSIGNMENTS_SUCCESS:
      bookmarksErrors = action.payload.bookmarksErrors;
      assignments = action.payload.assignments;
      return Object.assign({}, errorGetBookmarksAndSuccessGetAssignments(state), { bookmarksErrors, assignments });
    case GET_BOOKMARKS_SUCCESS_AND_ASSIGNMENTS_ERROR:
      bookmarks = action.payload.bookmarks;
      assignmentsErrors = action.payload.assignmentsErrors;
      return Object.assign({}, successGetBookmarksAndErrorGetAssignments(state), { bookmarks, assignmentsErrors });

    case REMOVE_ASSIGNMENT:
      return Object.assign({}, startRemoveAssignment(state));
    case REMOVE_ASSIGNMENT_ERROR:
      const removeAssignmentErrorMessage = action.payload;
      return Object.assign({}, errorRemoveAssignment(state), { removeAssignmentErrorMessage });
    case REMOVE_ASSIGNMENT_SUCCESS:
      const removeAssignmentSuccessMessage = action.payload;
      return Object.assign({}, successRemoveAssignment(state), { removeAssignmentSuccessMessage });

    case REMOVE_BOOKMARK:
      return Object.assign({}, startRemoveBookmark(state));
    case REMOVE_BOOKMARK_ERROR:
      const removeBookmarkErrorMessage = action.payload;
      return Object.assign({}, errorRemoveBookmark(state), { removeBookmarkErrorMessage });
    case REMOVE_BOOKMARK_SUCCESS:
      const removeBookmarkSuccessMessage = action.payload;
      return Object.assign({}, successRemoveBookmark(state), { removeBookmarkSuccessMessage });
    case RESET:
      return initialState;
    default:
      return '';
  }
}
