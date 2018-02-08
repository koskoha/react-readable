import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/postActions';
import history from '../routers/history'
import { postVote, deletePost } from '../actions/postActions';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Author from 'material-ui/svg-icons/social/person';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import CommentIcon from 'material-ui/svg-icons/action/question-answer';
import Divider from 'material-ui/Divider';

const styles = {
  card: {
    margin: 20
  },
  post:{
    textAlign:'center',
    backgroundColor:'#FAFAFA'
  },
  button:{
    margin: 5
  },
  icons:{
    marginLeft:5,
    marginRight:5,
  },
  title:{
    color:'#039BE5', 
    fontSize:20
  },
  divider:{
    marginLeft:70, marginRight:70
  }
}

class PostInfoList extends Component{

  onVoteClick(e, option){
    this.props.voteActions('posts',this.props.post.id, { option })
  }

  onDeleteClick (){
    this.props.deletePost(this.props.post.id)
  }

  render(){
    const post = this.props.post;
    return (
      <Card style={styles.card}>
        <CardHeader
          title={<span style={styles.title}> {post.title}</span>}
          subtitle= {<div>By: {post.author} <p> Date:  {new Date(post.timestamp).toDateString()}</p></div>}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions style={{textAlign:'center'}}>
          <Divider style={styles.divider} />
          <Link to={`${post.category}/${post.id}`}><FlatButton label='Read more...' primary /></Link><br/>
          <br/>
          <span style={{color:'grey', marginRight:40}}>
            <FavoriteIcon style={styles.icons} color={'grey'} /> <span style={{marginBottom:15}}>{post.voteScore}</span>
          </span>
          <span style={{color:'grey'}}>
            <CommentIcon style={styles.icons} color={'grey'}/> {post.commentCount}
          </span>
        </CardActions>
        <CardText style={styles.post} expandable={true}>
          {post.body}
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
            <br/><br/>
            <RaisedButton style={styles.button} label='Delete' onClick={e=>this.onDeleteClick()} secondary />
            <Link to={`/edit/${post.id}`}><RaisedButton style={styles.button} label="Edit" primary /></Link>
          </p>
        </CardText>
      </Card>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    voteActions: bindActionCreators(postVote, dispatch),
    deletePost: bindActionCreators(deletePost, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(PostInfoList);