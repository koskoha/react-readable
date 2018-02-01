import React, { Component } from 'react';
import uniqid from 'uniqid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newPost, getPosts, editPost } from '../actions/postActions';
import { Link } from 'react-router-dom';

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

  onCategoryChange = (e) => {
    const category = e.target.value;
    this.setState(() => ({ category }));
  };
  
  onSubmit = (e) => {
    e.preventDefault();
    
    if (!this.state.title || !this.state.body || !this.state.author) {
      this.setState(() => ({ error: 'Please provide all necessary information.' }));
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
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Post title"
            autoFocus
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <textarea
            placeholder="Add a body for your post"
            value={this.state.body}
            onChange={this.onBodyChange}
          >
          </textarea>
          <input
            type="text"
            placeholder="Post author"
            autoFocus
            value={this.state.author}
            onChange={this.onAuthorChange}
          />
          <select value={this.state.category} onChange={this.onCategoryChange}>
            {
              this.props.categories.map(category =>(category.name !== "all" && <option key={category.path} value={category.name}>{category.name}</option>))
            }
          </select>
          <button>
            {this.state.edit ? 'Save' : 'Add post'}
          </button>
          <button>
            <Link to={this.state.edit ? `/post/${this.state.id}` : '/'}>Cancel</Link>
          </button>
        </form>
      </div>
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