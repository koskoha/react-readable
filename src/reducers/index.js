import { combineReducers } from 'redux'
import categoriesReducers from '../reducers/categoriesReducers';
import postReducers from '../reducers/postReducers'
import commentReducer from '../reducers/commentReducer'
import sortersReducers from './sortersReducers';

const rootReducer = combineReducers({
  categories: categoriesReducers,
  posts: postReducers,
  comments: commentReducer,
  sorter: sortersReducers
})

export default rootReducer;