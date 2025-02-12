export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

const initialState = {
  comments: [],
}

export function commentReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: action.comments }
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.comment] }
    case REMOVE_COMMENT:
      return { ...state, comments: state.comments.filter(comment => comment._id !== action.commentId) }
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === action.comment._id ? action.comment : comment
        )}
    default:
      return state
  }
}
