import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { configureStore } from '../store/configureStore';
import * as categoriesActions from '../actions/categoriesActions';
import * as postActions from '../actions/postActions';
import AppRouter from '../routers/AppRouter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();
store.dispatch(categoriesActions.getCategories());
store.dispatch(postActions.getPosts());


const App = (props) => (
  <MuiThemeProvider>
    <Provider store={store} >
      <AppRouter />
    </Provider>
  </MuiThemeProvider>
)

export default App;
