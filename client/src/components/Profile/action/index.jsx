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
  RESET,
} from '../constant';

import call from '../api';

export const getBookmarksAndAssignments = () => {
  return async dispatch => {
    dispatch({type: GET_BOOKMARKS_AND_ASSIGNMENTS});
    const bookmarksResponse = await call.getBookmarks();
    const assignmentsResponse = await call.getAssignments();
    if (bookmarksResponse && assignmentsResponse) {
      if (bookmarksResponse.msg === 'error' && assignmentsResponse.msg === 'error') {
        dispatch(getBookmarksAndAssignmentsError({
          assignmentsErrors: assignmentsResponse.data, 
          bookmarksErrors: bookmarksResponse.data 
        }));
      }
      if (bookmarksResponse.msg === 'success' && assignmentsResponse.msg === 'success') {
        dispatch(getBookmarksAndAssignmentsSuccess({
          assignmentsSuccess: assignmentsResponse.data, 
          bookmarksSuccess: bookmarksResponse.data 
        }));
      }
      if (bookmarksResponse.msg === 'success' && assignmentsResponse.msg === 'error') {
        dispatch(getBookmarksSuccessAndAssignmentsError(bookmarksResponse.data, assignmentsResponse.data));
      }
      if (bookmarksResponse.msg === 'error' && assignmentsResponse.msg === 'success') {
        dispatch(getBookmarksErrorAndAssignmentsSuccess(bookmarksResponse.data, assignmentsResponse.data));
      }
    }
  }
}

export const getBookmarksAndAssignmentsSuccess = data => {
  return {
    type: GET_BOOKMARKS_AND_ASSIGNMENTS_SUCCESS,
    payload: data
  }
}

export const getBookmarksAndAssignmentsError = errors => {
  return {
    type: GET_BOOKMARKS_AND_ASSIGNMENTS_ERROR,
    payload: errors
  }
}

export const getBookmarksSuccessAndAssignmentsError = (bookmarks, assignmentsErrors) => {
  return {
    type: GET_BOOKMARKS_SUCCESS_AND_ASSIGNMENTS_ERROR,
    payload: {bookmarks: bookmarks, assignmentsErrors: assignmentsErrors}
  }
}  

export const getBookmarksErrorAndAssignmentsSuccess = (bookmarksErrors, assignments) => {
  return {
    type: GET_BOOKMARKS_ERROR_AND_ASSIGNMENTS_SUCCESS,
    payload: {bookmarksErrors: bookmarksErrors, assignments: assignments}
  }
}

export const removeAssignment = content_id => {
  return async dispatch => {
    dispatch({type: REMOVE_ASSIGNMENT});

    const response = await call.removeAssignment(content_id);

    response.msg === 'success' ?
    dispatch(removeAssignmentSuccess(response.data)) :
    dispatch(removeAssignmentError(response.data))
  }
}

export const removeAssignmentSuccess = data => {
  return {
    type: REMOVE_ASSIGNMENT_SUCCESS,
    payload: data
  }
}

export const removeAssignmentError = data => {
  return {
    type: REMOVE_ASSIGNMENT_ERROR,
    payload: data
  }
}

export const removeBookmark = content_id => {
  return async dispatch => {
    dispatch({type: REMOVE_BOOKMARK})

    const response = await call.removeBookmark(content_id);

    response.msg === 'success' ?
    dispatch(removeBookmarkSuccess(response.data)) :
    dispatch(removeBookmarkError(response.data))
  }
}

export const removeBookmarkSuccess = data => {
  return {
    type: REMOVE_BOOKMARK_SUCCESS,
    payload: data
  }
}

export const removeBookmarkError = data => {
  return {
    type: REMOVE_BOOKMARK_ERROR,
    payload: data
  }
}

export const resetStates = () => {
  return {
    type: RESET
  }
}
