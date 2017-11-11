import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { createCookieMiddleware } from "redux-cookie";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/index";

export default function configureStore(initialState, cookie)
{
    const middlewareModules = [thunk, promise, createCookieMiddleware(cookie)];
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