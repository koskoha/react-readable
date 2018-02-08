import * as commentActions from '../actions/commentActions';

export default function commentReducer(state = [], action){
  switch (action.type){
    case commentActions.GET_COMMENTS_SUCCESS: {
      return action.comments;
    }
    case commentActions.NEW_COMMENT_SUCCESS: {
      return [...state, action.comment]
    }
    case commentActions.DELETE_COMMENT_SUCCESS: {
      return state.map( comment => 
        comment.id === action.commentId ? {...comment, deleted: true} : comment
      )
    }
    case commentActions.EDIT_COMMENT_SUCCESS: {
      return state.map( comment => 
        comment.id === action.comment.id ? {...comment, ...action.comment} : comment
      )
    }
    default:
      return state;
  }
}