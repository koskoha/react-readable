import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import Comment from './Comment';
import { getComments } from '../actions/commentActions';
import { postVote, getPosts, deletePost } from '../actions/postActions';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

class Post extends Component {

  
  componentDidMount(){
    this.props.comActions(this.props.post.id);
  }
  
  onVoteClick(e, option){
    this.props.voteActions('posts',this.props.post.id, { option })
  }
  
  onDeleteClick (){
    this.props.deletePost(this.props.post.id)
    this.props.history.push('/');
  }
  
  render(){
    const post = this.props.post;
    return (
      <div>
        <div className="Post">
          <button><Link to='/'>Home</Link></button>
          <p>{new Date(post.timestamp).toDateString()}</p>
          <h2> {post.title}</h2>
          <h5>{post.body}</h5>
          <p>{post.author}</p>
          <p>
            <button onClick={e => {this.onVoteClick(e,"upVote")}}>+</button> 
              {post.voteScore} 
            <button onClick={e => {this.onVoteClick(e,"downVote")}}>-</button>
          </p>
          <button onClick={e=>this.onDeleteClick()}>Delete</button>
          <button>
            <Link to={`/edit/${post.id}`}>Edit</Link>
          </button>
        </div>
        <h4>Post has {post.commentCount} comments:</h4>
        {
          this.props.comments.map((comment)=> 
            <Comment 
              postId = {this.props.post.id} 
              comment={comment}
            />
          )
        }
        <CommentForm postId={this.props.post.id}/>
      </div>
    )
  };
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.find((post) => post.id === props.match.params.id),
    comments: state.comments
  };
};

function mapDispatchToProps(dispatch){
  return {
    comActions: bindActionCreators(getComments, dispatch),
    voteActions: bindActionCreators(postVote, dispatch),
    postActions: bindActionCreators(getPosts, dispatch),
    deletePost: bindActionCreators(deletePost, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);