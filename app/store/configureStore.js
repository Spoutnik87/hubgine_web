import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/index";

export default function configureStore(initialState)
{
  const middlewareModules = [thunk, promise];
  if (process.env.NODE_ENV !== "production")
  {
    middlewareModules.push(createLogger());
  }
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewareModules)
  );
  return store;
}
