import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import moment from "moment";
import "moment/locale/fr";
import App from "./components/App";
import configureStore from "./store/configureStore";
import getLanguage from "./languages/lang";

const cookies = new Cookies();
const user = cookies.get("user") || {};
const lang = getLanguage(user.lang);
const store = configureStore({
    ...window.INITIAL_STATE,
    user: user,
    lang: lang
}, cookies);
moment.locale(lang.LOCALE);

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);