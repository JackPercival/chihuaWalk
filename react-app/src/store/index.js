import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import dogsReducer from './dog';
import mapsReducer from './map';
import walksReducer from './walk';
import dogsWalksReducer from './walk_dog';
import reviewsReducer from './review';
import searchReducer from './search';

const rootReducer = combineReducers({
  session,
  maps: mapsReducer,
  dogs: dogsReducer,
  walks: walksReducer,
  dogsWalks: dogsWalksReducer,
  reviews: reviewsReducer,
  search: searchReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
