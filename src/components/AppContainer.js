import React from 'react';
import PostsList from './PostsList';
import Categories from './Categories';
import PostsSorter from './PostsSorter';

const AppContainer = () => {
    return (
      <div>
        <Categories />
        <PostsSorter />
        <PostsList />
      </div>
    )
}

export default AppContainer;