import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import sortPosts from '../sorters/posts';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  card: {
    margin: 20
  }
}

const PostsList = (props) => (
  <div>
    {props.posts.map(post =>(
        !post.deleted && <div key={post.id}>
          <Card style={styles.card}>
            <CardHeader
              title={post.title}
              subtitle={post.author}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
              <Link to={`post/${post.id}`}><FlatButton label='Read more...' primary /></Link>
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
);

const mapStateToProps = (state) => {
  return{
    posts: sortPosts(state.posts, state.sorter)
  };
};

export default connect(mapStateToProps)(PostsList);