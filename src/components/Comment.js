import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { getComments, deleteComment } from '../actions/commentActions';
import { postVote, updateCommentCounter } from '../actions/postActions';
import { bindActionCreators } from 'redux';
import CommentForm from './CommentForm';


class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editComment: false
    }

    this.onEditComment = this.onEditComment.bind(this);
    this.onCancelEditComment = this.onCancelEditComment.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onVoteClick(e, option, comId){
    this.props.voteActions('comments', comId, { option });
    this.props.getComments(this.props.postId);
  }
  
  onDeleteClick (comment){
    this.props.deleteComment(comment.id);
    this.props.updateCommentCounter(comment.parentId, -1);

  }

  onSaveClick(){
    this.setState(()=>({editComment:false}));
  }

  onEditComment(){
    this.setState(()=>({editComment:true}));
  }

  onCancelEditComment(){
    this.setState(()=>({editComment:false}));
  }

  render() {
    const comment = this.props.comment;
    return (
      <div className="App">
        {
          this.state.editComment ? <CommentForm onSaveClick={this.onSaveClick} onCancelClick={this.onCancelEditComment} comment={comment} /> :
          !comment.deleted &&
          <div key={comment.id} className="App">
            <hr/>
            <p>{new Date(comment.timestamp).toDateString()}</p>
            <p> {comment.title}</p>
            <p>{comment.body}</p>
            <p>{comment.author}</p>
            <p>
              <button onClick={e => {this.onVoteClick(e,"upVote",comment.id)}}> + </button>
              {comment.voteScore} 
              <button onClick={e => {this.onVoteClick(e,"downVote", comment.id)}}> - </button>
            </p>
            <button onClick={e=>this.onDeleteClick(comment)}>Delete</button>
            <button onClick={e=> this.onEditComment()}>Edit</button>
            <hr/>
          </div>
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    getComments: bindActionCreators(getComments, dispatch),
    voteActions: bindActionCreators(postVote, dispatch),
    deleteComment: bindActionCreators(deleteComment, dispatch),
    updateCommentCounter: bindActionCreators(updateCommentCounter, dispatch)
  }
}

export default connect(null , mapDispatchToProps)(Comment);