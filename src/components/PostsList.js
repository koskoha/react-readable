import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import sortPosts from '../sorters/posts';
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/postActions';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  card: {
    margin: 20
  }
}

class PostsList extends Component{

  componentDidMount(){
      const category = this.props.category;
      console.log('category from postList', category);
      if(category === 'all'){
        return this.props.postActions.getPosts();
      }
      this.props.postActions.getPostsByCategory(category);
  }

  render(){
    return (
      <div>
      {this.props.posts.map(post =>(
          !post.deleted && <div key={post.id}>
            <Card style={styles.card}>
              <CardHeader
                title={post.title}
                subtitle={post.author}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions>
                <Link to={`${post.category}/${post.id}`}><FlatButton label='Read more...' primary /></Link>
              </CardActions>
              <CardText expandable={true}>
                {post.body}
              </CardText>
            </Card>
           
          </div>)
          )
        }
        <Link to='/create'><RaisedButton  label="Add Post" fullWidth={true} primary/></Link>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log("CAtegory from mapState", props.match.params.category);
  return{
    category:props.match.params.category,
    posts: sortPosts(state.posts, state.sorter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    postActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);