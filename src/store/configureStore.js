import { createStore, applyMiddleware, compose } from 'redux'

//Redux Thunk need to be added as a middleware

import thunkMiddleware from 'redux-thunk'

// Redux logging middleware
import { createLogger } from 'redux-logger'

// Import the root reducer
import rootReducer from '../reducers/index'


// Create the redux logging middleware 
const loggerMiddleware = createLogger()


// Configuring the Store. PreloadState is the initial State.
export function configureStore(preloadedState) {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    preloadedState,

    //Apply the middleware usign the Redux's provided applymiddleware function
    composeEnhancers(    
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    )
  )
}