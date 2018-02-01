import * as categoriesActions from '../actions/categoriesActions';

const categoriesDefaultState = [
  {name:'all', path: 'all'}
]

export default function categoriesReducers(state=categoriesDefaultState, action){
  switch (action.type){
    case categoriesActions.GET_CATEGORIES_SUCCESS: {
      return [
        ...state,
        ...action.categories
      ] 
    }
    default:
      return state
  }
}