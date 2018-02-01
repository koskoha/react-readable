import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/postActions';
import uniqid from 'uniqid';

class Categories extends Component {

  clickHandler(e, category){
    e.preventDefault();
    console.log(category.path);
  }

  getPostsByCategory(e, category){
    e.preventDefault();
    if(category.path === 'all'){
      this.props.postActions.getPosts();
    }
    this.props.postActions.getPostsByCategory(category.path);
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo hide-on-small-and-down">Readable</a>
          <ul id="nav-mobile" className="right">
          {
            this.props.categories.map(category =>
              <li key={uniqid()}>
                <Link to="" onClick={e => { this.getPostsByCategory(e, category)}}>
                  {category.name}
                </Link>
              </li>
            )
          }
          </ul>
        </div>
      </nav>
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