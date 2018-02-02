import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/postActions';
import uniqid from 'uniqid';

import {Tabs, Tab} from 'material-ui/Tabs';

class Categories extends Component {

  getPostsByCategory(category){
    if(category.path === 'all'){
      this.props.postActions.getPosts();
    }
    this.props.postActions.getPostsByCategory(category.path);
  }

  render() {
    return (
      <div>
      <Tabs>
        {this.props.categories.map(category =>
          <Tab key={uniqid()} label={category.name} onActive={ () => { this.getPostsByCategory(category)}} />)
        }
      </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
      categories: state.categories
  }
}

function mapDispatchToProps(dispatch){
  return{
    postActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);