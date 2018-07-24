import {
  BOOKMARK_CONTENT,
  BOOKMARK_CONTENT_SUCCESS,
  BOOKMARK_CONTENT_ERROR,

  REMOVE_BOOKMARK, 
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_ERROR,

  ASSIGN_CONTENT,
  ASSIGN_CONTENT_SUCCESS,
  ASSIGN_CONTENT_ERROR,

  REMOVE_ASSIGNMENT,
  REMOVE_ASSIGNMENT_SUCCESS,
  REMOVE_ASSIGNMENT_ERROR,
} from '../constant';

import { 
  startBookmarkContent, successBookmarkContent, errorBookmarkContent, startRemoveBookmark, successRemoveBookmark, errorRemoveBookmark, startAssignContent, successAssignContent, errorAssignContent, startRemoveAssignment, successRemoveAssignment, errorRemoveAssignment,
} from '../util';

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOKMARK_CONTENT:
      return Object.assign({}, startBookmarkContent(state));
    case BOOKMARK_CONTENT_SUCCESS:
      const bookmarkedSuccessMessage = action.payload
      return Object.assign({}, successBookmarkContent(state), { bookmarkedSuccessMessage });
    case BOOKMARK_CONTENT_ERROR:
      const bookmarkedErrorMessage = action.payload
      return Object.assign({}, errorBookmarkContent(state), { bookmarkedErrorMessage });

    case REMOVE_BOOKMARK:
      return Object.assign({}, startRemoveBookmark(state));
    case REMOVE_BOOKMARK_SUCCESS:
      const removeBookmarkSuccessMessage = action.payload;
      return Object.assign({}, successRemoveBookmark(state), { removeBookmarkSuccessMessage });
    case REMOVE_BOOKMARK_ERROR:
      const removeBookmarkErrorMessage = action.payload;
      return Object.assign({}, errorRemoveBookmark(state), { removeBookmarkErrorMessage });

    case ASSIGN_CONTENT:
      return Object.assign({}, startAssignContent(state));
    case ASSIGN_CONTENT_SUCCESS: 
      const assignContentSuccessMessage = action.payload;
      return Object.assign({}, successAssignContent(state), { assignContentSuccessMessage });
    case ASSIGN_CONTENT_ERROR:
      const assignContentErrorMessage = action.payload;
      return Object.assign({}, errorAssignContent(state), { assignContentErrorMessage });

    case REMOVE_ASSIGNMENT:
      return Object.assign({}, startRemoveAssignment(state));
    case REMOVE_ASSIGNMENT_SUCCESS:
      const removeAssignmentSuccessMessage = action.payload;
      return Object.assign({}, successRemoveAssignment(state), { removeAssignmentSuccessMessage });
    case REMOVE_ASSIGNMENT_ERROR:
      const removeAssignmentErrorMessage = action.payload;
      return Object.assign({}, errorRemoveAssignment(state), { removeAssignmentErrorMessage });
    default:
      return state;
  }
}
