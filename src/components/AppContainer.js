import React, { Component } from 'react';
import PostsList from './PostsList';
import Categories from './Categories';
import PostsSorter from './PostsSorter';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';


class AppContainer extends Component{

  render(){
    return(
      <div>
        <Categories />
        <PostsSorter />
        <PostsList category={this.props.match.params.category}/>
        </div>
      )
    }
  }
  
  export default AppContainer;