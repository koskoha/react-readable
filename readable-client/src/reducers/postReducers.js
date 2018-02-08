import * as postActions from '../actions/postActions';

export default function postReducers(state=[], action){
  switch (action.type){
    case postActions.GET_ALL_POSTS_SUCCESS: {
      return action.posts; 
    }
    case postActions.GET_POSTS_BY_CATEGORY_SUCCESS: {
      return action.posts;
    }
    case postActions.NEW_POST_SUCCESS: {
      return [...state, action.post]
    }
    case postActions.DELETE_POST_SUCCESS: {
      return state.map( post => 
        post.id === action.postId ? {...post, deleted: true} : post
      )
    }
    case postActions.EDIT_POST_SUCCESS: {
      return state.map( post => 
        post.id === action.post.id ? {...post, ...action.post} : post
      )
    }
    case postActions.UPDATE_COMMENT_COUNTER: {
      return state.map( post => 
        post.id === action.postId ? {...post, commentCount:post.commentCount+action.value} : post
      )
    }
    default:
      return state;
  }
}

