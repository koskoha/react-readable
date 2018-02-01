import * as api from '../utils/httpClient'; 

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';

export function getCategories(){
  return (dispatch, getState) => {
    return api.getCategories().then(res => {
      dispatch(getCategoriesSuccess(res))
    })
  }
}

export function getCategoriesSuccess(categories){
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories
  }
}