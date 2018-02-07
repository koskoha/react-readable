import React, { Component } from 'react';
import uniqid from 'uniqid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newPost, getPosts, editPost } from '../actions/postActions';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  form:{ 
    margin: 30
  },
  button: {
    margin:15
  },
  error:{
    color:'red',
    padding: 30
  }
}

class PostForm extends Component {
  constructor(props) {
    super(props);

    const post = this.props.post;

    this.state = {
      id: post ? post.id : '',
      timestamp: '',
      title: post ? post.title : '',
      body: post ? post.body : '',
      author: post ? post.author : '',
      category: post ? post.category : 'react',
      edit: post ? true : false,
      voteScore: post ? post.voteScore : 1,
      commentCount: post ? post.commentCount : 0,
      error: '',
    };
  }

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  onBodyChange = (e) => {
    const body = e.target.value;
    this.setState(() => ({ body }));
  };

  onAuthorChange = (e) => {
    const author = e.target.value;
    this.setState(() => ({ author }));
  };

  onCategoryChange = (event, index, value) => {
    this.setState(() => ({ category: value }));
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    
    if (!this.state.title || !this.state.body || !this.state.author) {
      this.setState(() => ({ error: 'Please provide all necessary information!' }));
    } else {
      this.setState(() => ({ error: '' }));
      const newPost = {
        id: this.state.edit ? this.state.id : uniqid(),
        timestamp: new Date(),
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category,
        voteScore:this.state.voteScore,
        commentCount: this.state.commentCount,
      }
      if(this.state.edit){
        this.props.editPost(newPost);
        this.setState(()=> ({edit: false}))
        this.props.history.push(`/post/${this.state.id}`);
      }else{
        this.props.postNewPost(newPost);
        this.props.history.push('/');
      }
    }
  };
  render() {
    return (
      <Paper zDepth={3}>
        {this.state.error && <p style={styles.error}>{this.state.error}</p>}
        <form style={styles.form} onSubmit={this.onSubmit}>
          <TextField
            floatingLabelText="Post Title"
            hintText="Title"
            value={this.state.title}
            fullWidth={true}
            onChange={this.onTitleChange}
          />
          <TextField
            floatingLabelText="Post Author"
            value={this.state.author}
            onChange={this.onAuthorChange}
            hintText="Author"
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Post Body"
            value={this.state.body}
            onChange={this.onBodyChange}
            hintText="Body"
            fullWidth={true}
            multiLine
          />
          <SelectField
            fullWidth
            floatingLabelText="Category"
            value={this.state.category}
            onChange={this.onCategoryChange}
          >
            { this.props.categories.map(category =>(category.name !== "all" && <MenuItem key={category.path} value={category.path} primaryText={category.name} />)) }
          </SelectField>
          <RaisedButton type="submit" style={styles.button} label= {this.state.edit ? 'Save' : 'Add post'} primary />
          <Link to={this.state.edit ? `/${this.props.post.category}/${this.state.id}` : '/'}><RaisedButton style={styles.button} label='Cancel' secondary /></Link>
        </form>
      </Paper>
    )
  }
}

function mapStateToProps(state, props){
  return{
    categories: state.categories,
    post: state.posts.find((post) => post.id === props.match.params.id),
  }
}

function mapDispatchToProps(dispatch) {
  return{
    postNewPost: bindActionCreators(newPost, dispatch),
    getPosts: bindActionCreators(getPosts, dispatch),
    editPost: bindActionCreators(editPost, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);