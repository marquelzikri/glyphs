import { 
  BOOKMARK_CONTENT,
  REMOVE_BOOKMARK, 

  ASSIGN_CONTENT,
  REMOVE_ASSIGNMENT,

  REFRESH_STATE,
  BOOKMARK_CONTENT_SUCCESS,
  BOOKMARK_CONTENT_ERROR,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_ERROR,
  ASSIGN_CONTENT_SUCCESS,
  ASSIGN_CONTENT_ERROR,
  REMOVE_ASSIGNMENT_SUCCESS,
  REMOVE_ASSIGNMENT_ERROR,
} from '../constant';

import call from '../api';

export const refreshStates = () => {
  return {
    type: REFRESH_STATE
  }
}

// Add bookmark on a Content
export const bookmarkContent = contentID => {
  return async dispatch => {
    dispatch({type: BOOKMARK_CONTENT})

    const response = await call.bookmarkContent(contentID);
    // console.log(response.data) isinya msg: content has been bookmarked

    response.msg === 'success' ?
    dispatch(bookmarkContentSuccess(response.data)) :
    dispatch(bookmarkContentError(response.data))
  }
}

export const bookmarkContentSuccess = message => {
  return ({
    type: BOOKMARK_CONTENT_SUCCESS,
    payload: message
  })
}

export const bookmarkContentError = error => {
  return ({
    type: BOOKMARK_CONTENT_ERROR,
    payload: error
  })
}

// Remove bookmark from a Content
export const removeBookmark = contentID => {
  return async dispatch => {
    dispatch({type: REMOVE_BOOKMARK});

    const response = await call.removeBookmark(contentID);

    response.msg === 'success' ?
    dispatch(removeBookmarkSuccess(response.data)) :
    dispatch(removeBookmarkError(response.data))
  }
}

export const removeBookmarkSuccess = message => {
  return ({
    type: REMOVE_BOOKMARK_SUCCESS,
    payload: message
  })
}

export const removeBookmarkError = error => {
  return ({
    type: REMOVE_BOOKMARK_ERROR,
    payload: error
  })
}

// Assign content to user
export const assignContent = contentID => {
    return async dispatch => {
      dispatch({type: ASSIGN_CONTENT});

      const response = await call.assignContent(contentID);

      response.msg === 'success' ?
      dispatch(assignContentSuccess(response.data)) :
      dispatch(assignContentError(response.data))
    }
}

export const assignContentSuccess = message => {
  return ({
    type: ASSIGN_CONTENT_SUCCESS,
    payload: message
  })
}

export const assignContentError = error => {
  return ({
    type: ASSIGN_CONTENT_ERROR,
    payload: error
  })
}

export const removeAssignment = contentID => {
  return async dispatch => {
    dispatch({type: REMOVE_ASSIGNMENT});

    const response = await call.removeAssignment(contentID);

    response.msg === 'success' ?
    dispatch(removeAssignmentSuccess(response.data)) :
    dispatch(removeAssignmentError(response.data))
  }
}

export const removeAssignmentSuccess = message => {
  return ({
    type: REMOVE_ASSIGNMENT_SUCCESS,
    payload: message
  })
}

export const removeAssignmentError = error => {
  return ({
    type: REMOVE_ASSIGNMENT_ERROR,
    payload: error
  })
}
