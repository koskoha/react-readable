import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import sortPosts from '../sorters/posts';

const PostsList = (props) => (
  <div className="App">
    {props.posts.map(post =>(
        !post.deleted && <div key={post.id}>
          <h4><Link to={`post/${post.id}`}> {post.title}</Link></h4>
          comments:{post.commentCount}
        </div>)
        )
      }
      <button><Link to='/create'>Add Post</Link></button>
  </div>
);

const mapStateToProps = (state) => {
  return{
    posts: sortPosts(state.posts, state.sorter)
  };
};

export default connect(mapStateToProps)(PostsList);