import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import App from "./components/App";
import configureStore from "./store/configureStore";
import { ENGLISH } from "./constants/Languages";
import getLanguage from "./languages/lang";

const cookies = new Cookies();
const user = cookies.get("user") || {};
const store = configureStore({
    ...window.INITIAL_STATE,
    user: user,
    lang: getLanguage(user.lang)
}, cookies);

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);