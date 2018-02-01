import * as api from '../utils/httpClient';

export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const NEW_COMMENT_SUCCESS = 'NEW_COMMENT_SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';

export function getComments(postId){
  return (dispatch, getState) => {
    return api.getComments(postId).then(res => {
      dispatch(getCommentsSuccess(res))
    })
  }
}

export function getCommentsSuccess(comments){
  return{
    type: GET_COMMENTS_SUCCESS,
    comments
  }
}

export function newComment(comment){
  return (dispatch, getState) => {
    return api.postNewComment(comment).then(res => {
      dispatch(newCommentSuccess(comment))
    })
  }
}

export function newCommentSuccess (comment) {
  return{
    type: NEW_COMMENT_SUCCESS,
    comment
  }
}

export function deleteComment(commentId){
  return (dispatch, getState) => {
    return api.deleteComment(commentId).then(res => {
      dispatch(deleteCommentSuccess(commentId))
    })
  }
}

export function deleteCommentSuccess(commentId){
  return{
    type: DELETE_COMMENT_SUCCESS,
    commentId
  }
}

export function editComment(comment){
  return (dispatch, getState) => {
    return api.editComment(comment).then((res) => {
      dispatch(editCommentSuccess(comment))
    })
  }
}

export function editCommentSuccess (comment) {
  return{
    type: EDIT_COMMENT_SUCCESS,
    comment
  }
}
