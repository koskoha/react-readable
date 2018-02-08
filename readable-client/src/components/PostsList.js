import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import sortPosts from '../sorters/postsSorter';
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/postActions';
import history from '../routers/history'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PostInfoList from './PostInfoList';

const styles = {
  card: {
    margin: 20
  }
}

class PostsList extends Component{

  componentWillReceiveProps(nextProps){
    if(this.props.category !== nextProps.category){
        const category = nextProps.category;
        if(nextProps.category === 'all'){
          this.props.postActions.getPosts();
        }else if(nextProps.category){
          this.props.postActions.getPostsByCategory(nextProps.category);
        }
      }
  }

  render(){
    console.log("PostList", this.props.posts);
    return (
      <div>
      {this.props.posts.map(post =>(
          !post.deleted && <PostInfoList key={post.id} post={post} />)
          )
        }
        <Link to='/create'><RaisedButton  label="Add Post" fullWidth={true} primary/></Link>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return{
    categoriesList: state.categories,
    posts: sortPosts(state.posts, state.sorter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    postActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);