import React, { Component } from 'react';
import uniqid from 'uniqid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newComment, editComment } from '../actions/commentActions';
import { updateCommentCounter } from '../actions/postActions';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  error:{
    color:'red',
    padding: 30
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    const comment = this.props.comment;

    this.state = {
      id: comment ? comment.id : '',
      timestamp: '',
      body: comment ? comment.body : '',
      author: comment ? comment.author : '',
      parentId: comment ? comment.parentId : this.props.postId,
      edit: comment ? true : false,
      voteScore: comment ? comment.voteScore : 1,
      error: ''
    };
  }

  onBodyChange = (e) => {
    const body = e.target.value;
    this.setState(() => ({ body }));
  };

  onAuthorChange = (e) => {
    const author = e.target.value;
    this.setState(() => ({ author }));
  };

  onCancel(){
    this.props.onCancelClick();
  }

  onAddComment(comment){
    this.props.newComment(comment);
    this.props.updateCommentCounter(comment.parentId, 1);
  }

  onUpdate(comment){
    this.props.editComment(comment);
    this.props.onSaveClick();
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.body ||!this.state.author) {
      this.setState(() => ({ error: 'Please provide all necessary information!' }));
    } else {
      this.setState(() => ({ error: '', body: '', author: '' }));
      const comment = {
        id: this.state.edit ? this.state.id : uniqid(),
        timestamp: new Date(),
        body: this.state.body,
        author: this.state.author,
        voteScore: this.state.voteScore,
        parentId: this.state.parentId,
        deleted: false
      }
      this.state.edit ? (this.onUpdate(comment)) : this.onAddComment(comment);
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p style={styles.error}>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <TextField
            multiLine
            floatingLabelText="Your comment"
            hintText="Add comment"
            value={this.state.body}
            // fullWidth={true}
            onChange={this.onBodyChange}
          />
          <br/>
          <TextField
            floatingLabelText="Comment author"
            hintText="Your name"
            value={this.state.author}
            // fullWidth={true}
            onChange={this.onAuthorChange}
          />
          <br/>
          <FlatButton type="submit" label= {this.state.edit ? 'Update' : 'Add comment'} primary />
          { this.state.edit && <FlatButton label='Cancel' onClick={e=>this.onCancel()} secondary /> }
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return{
    newComment: bindActionCreators(newComment, dispatch),
    editComment: bindActionCreators(editComment, dispatch),
    updateCommentCounter: bindActionCreators(updateCommentCounter, dispatch),
  }
}

export default connect(undefined, mapDispatchToProps)(CommentForm);