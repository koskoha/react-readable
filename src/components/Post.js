import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { bindActionCreators } from 'redux';
import Comment from './Comment';
import { getComments } from '../actions/commentActions';
import { postVote, deletePost } from '../actions/postActions';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import uniqid from 'uniqid';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import Home from 'material-ui/svg-icons/action/home';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Author from 'material-ui/svg-icons/social/person';

const styles = {
  post:{
    textAlign:'center',
    padding: 20,
    marginTop: 5,
  },
  button:{
    margin: 5
  },
  commentForm:{
    marginTop:30,
    marginLeft: 50,
    padding:15,
    width:300,
  },
  commentCounter:{
    color: 'darkturquoise'
  }
}

class Post extends Component {
  
  componentDidMount(){
    this.props.getComments(this.props.post.id);
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
        <Link to='/'>
          <RaisedButton 
            fullWidth 
            label="Home"
            primary
            icon={<Home />}
          />
        </Link>
        <Paper zDepth={2} style={styles.post}>
          <p><Schedule />  {new Date(post.timestamp).toDateString()}</p>
          <h2> {post.title}</h2>
          <Divider />
          <h5>{post.body}</h5>
          <p><Author />    {post.author}</p>
          <p>
            <FlatButton 
              icon={<ThumbUp />}
              onClick={e => {this.onVoteClick(e,"upVote")}} 
            /> 
            {post.voteScore}
            <FlatButton 
              icon={<ThumbDown />}
              onClick={e => {this.onVoteClick(e,"downVote")}}
            /> 
          </p>
          <RaisedButton style={styles.button} label='Delete' onClick={e=>this.onDeleteClick()} secondary />
          <Link to={`/edit/${post.id}`}><RaisedButton style={styles.button} label="Edit" primary /></Link>
        </Paper>
        <h3 style={styles.commentCounter}>Post has {post.commentCount} comments:</h3>
        {
          this.props.comments.map((comment)=> 
            <Comment key={uniqid()}
              postId = {this.props.post.id} 
              comment={comment}
            />
          )
        }
        <Paper style={styles.commentForm}>
          Leave Your Comment:
          <CommentForm postId={this.props.post.id}/>
        </Paper>
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
    getComments: bindActionCreators(getComments, dispatch),
    voteActions: bindActionCreators(postVote, dispatch),
    deletePost: bindActionCreators(deletePost, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);