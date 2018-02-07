import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import NotFoundPage from '../components/NotFoundPage';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { Redirect } from 'react-router';
import PostsList from '../components/PostsList';

const AppRouter = () => (
  <div>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to='/all' />)} />
          <Route exact path="/:category" component={AppContainer} />
          <Route path="/create" component={PostForm} exact/>
          <Route path="/edit/:id" component={PostForm} exact/>
          <Route exact path="/*/:id" component={Post}/>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default AppRouter;