import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';

export default function configureStore(initialState) {
  let middlewareModules = [thunk, promise];
  if (process.env.NODE_ENV !== 'production')
  {
    middlewareModules.push(createLogger())
  }
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewareModules)
  );
  return store;
}
