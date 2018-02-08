import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import NotFoundPage from '../components/NotFoundPage';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { Redirect } from 'react-router';
import PostsList from '../components/PostsList';
// <Route path="*" render={() => (<Redirect to='/404' />)} />
// <Route path="/404" component={NotFoundPage} />

const AppRouter = () => (
  <div>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to='/all' />)} />
          <Route exact path="/create" component={PostForm} />
          <Route exact path="/edit/:id" component={PostForm} />
          <Route exact path="/:category/:id" component={Post}/>
          <Route exact path="/:category" component={AppContainer} />
          <Route path="*" component={NotFoundPage} />
          </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default AppRouter;