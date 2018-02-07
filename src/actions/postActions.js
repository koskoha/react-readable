import * as api from '../utils/httpClient';

export const GET_ALL_POSTS_SUCCESS = 'GET_ALL_POSTS_SUCCESS';
export const GET_POSTS_BY_CATEGORY_SUCCESS = 'GET_POSTS_BY_CATEGORY_SUCCESS';
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const UPDATE_COMMENT_COUNTER = 'UPDATE_COMMENT_COUNTER';

export function getPosts(){
  return (dispatch, getState) => {
    return api.getPosts().then(res => {
      dispatch(getPostsSuccess(res))
    })
  }
}

export function getPostsSuccess(posts){
  return{
    type: GET_ALL_POSTS_SUCCESS,
    posts
  }
}

export function getPostsByCategory(category){
  console.log("Action ", category);
  return (dispatch, getState) => {
    return api.getPostsByCategory(category).then(res => {
      dispatch(getPostsByCategorySuccess(res))
    })
  }
}

export function getPostsByCategorySuccess(posts){
  return{
    type: GET_POSTS_BY_CATEGORY_SUCCESS,
    posts
  }
}

export function postVote(link,postID,vote){
  return (dispatch, getState) => {
    return api.postVoteScore(link, postID, vote).then(res => {
      postVoteSuccess();
      dispatch(getPosts());
    })
  }
}

export function postVoteSuccess () {
  return{
    type: POST_VOTE_SUCCESS,
  }
}

export function newPost(post){
  return (dispatch, getState) => {
    return api.postNewPost(post).then((res) => {
      dispatch(newPostSuccess(post))
    })
  }
}

export function newPostSuccess (post) {
  return{
    type: NEW_POST_SUCCESS,
    post
  }
}

export function deletePost(postId){
  return (dispatch, getState) => {
    return api.deletePost(postId).then(res => {
      dispatch(deletePostSuccess(postId))
    })
  }
}

export function deletePostSuccess(postId){
  return{
    type: DELETE_POST_SUCCESS,
    postId
  }
}

export function editPost(post){
  return (dispatch, getState) => {
    return api.editPost(post).then((res) => {
      dispatch(editPostSuccess(post))
    })
  }
}

export function editPostSuccess (post) {
  return{
    type: EDIT_POST_SUCCESS,
    post
  }
}

export const updateCommentCounter = (postId, value) => {
  return {
    type: UPDATE_COMMENT_COUNTER,
    value,
    postId
  }
}



