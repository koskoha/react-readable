const apiLink = 'http://localhost:3001'

// Generate a unique token 
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const header = { headers: {'Authorization': token }};

export const getCategories = () =>
  fetch(`${apiLink}/categories`, header)
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = () =>
  fetch(`${apiLink}/posts`, header)
    .then(res => res.json())
    .then(data =>  data);

export const getPostsByCategory = (category) =>
  fetch (`${apiLink}/${category}/posts`, header)
    .then(res => res.json())
    .then(posts =>  posts);

export const getComments = (postId) =>
  fetch (`${apiLink}/posts/${postId}/comments`, header)
    .then(res => res.json())
    .then(comm => comm);

export const postVoteScore = (link,postId,vote) =>
  fetch(`${apiLink}/${link}/${postId}`, {
    method: 'POST',
    headers: {'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(vote)
  })

export const postNewPost = (post) =>
  fetch(`${apiLink}/posts`, {
    method: 'POST',
    headers: {'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })

export const postNewComment = (comment) =>
  fetch(`${apiLink}/comments`, {
    method: 'POST',
    headers: {'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })

export const deletePost = (postId) =>
  fetch(`${apiLink}/posts/${postId}`, {
    method: 'DELETE',
    headers: {'Authorization': token, 'Content-Type': 'application/json' }
  })

export const deleteComment = (commentId) =>
  fetch(`${apiLink}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {'Authorization': token, 'Content-Type': 'application/json' }
  })

export const editPost = (post) =>
  fetch(`${apiLink}/posts/${post.id}`, {
    method: 'PUT',
    headers: {'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })

export const editComment = (comment) =>
  fetch(`${apiLink}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {'Authorization': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })

 
