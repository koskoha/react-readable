import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { getComments, deleteComment } from '../actions/commentActions';
import { postVote, updateCommentCounter } from '../actions/postActions';
import { bindActionCreators } from 'redux';
import CommentForm from './CommentForm';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import Timestamp from 'material-ui/svg-icons/action/schedule';
import Author from 'material-ui/svg-icons/social/person';
import CommentIcon from 'material-ui/svg-icons/communication/forum';
import styles from '../styles/comment'

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
      <div>
        {
          this.state.editComment ? <Paper style={styles.comment} zDepth={1} key={comment.id}><CommentForm onSaveClick={this.onSaveClick} onCancelClick={this.onCancelEditComment} comment={comment} /> </Paper> : !comment.deleted &&
          <Paper style={styles.comment} zDepth={1} key={comment.id}>
            <p><Timestamp />     {new Date(comment.timestamp).toDateString()}</p>
            <Divider/>
            <div style={styles.blocks}>
              <p><CommentIcon />   {comment.body}</p>
              <p><Author />   {comment.author}</p>
            </div>
              <div style={styles.blocks}>
              <FlatButton 
                icon={<ThumbUp />}
                onClick={e => {this.onVoteClick(e,"upVote",comment.id)}} 
              /> 
              {comment.voteScore}
              <FlatButton 
                icon={<ThumbDown />}
                onClick={e => {this.onVoteClick(e,"downVote",comment.id)}}
              /> 
            </div>
            <Divider/>
            <FlatButton label='Delete' onClick={e=>this.onDeleteClick(comment)} secondary />
            <FlatButton label='Edit' onClick={e=>this.onEditComment()} primary />
          </Paper>
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