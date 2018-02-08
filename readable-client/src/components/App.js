import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import * as categoriesActions from '../actions/categoriesActions';
import * as postActions from '../actions/postActions';
import AppRouter from '../routers/AppRouter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  componentDidMount(){
    this.props.store.dispatch(categoriesActions.getCategories());
  }

  render(){
    return(
      <MuiThemeProvider>
        <Provider store={this.props.store} >
          <AppRouter />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;
