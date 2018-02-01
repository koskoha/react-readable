import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import NotFoundPage from '../components/NotFoundPage';
import Post from '../components/Post';
import PostForm from '../components/PostForm';

const AppRouter = () => (
  <div className='container'>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={AppContainer} exact />
          <Route path="/create" component={PostForm} exact/>
          <Route path="/edit/:id" component={PostForm}/>
          <Route path="/post/:id" component={Post}/>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default AppRouter;