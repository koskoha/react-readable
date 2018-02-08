import  { SORT_BY_DATE, SORT_BY_SCORE } from '../actions/sortersActions'


const sortersReducerDefaultState = {
  sortBy: 'score'
};

export default (state = sortersReducerDefaultState, action) => {
  switch (action.type) {
    case SORT_BY_SCORE:
      return {
        sortBy: 'score'
      };
    case SORT_BY_DATE:
      return {
        sortBy: 'date'
      };
    default:
      return state;
  }
};