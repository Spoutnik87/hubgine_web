import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "./components/App";
import configureStore from "./store/configureStore";
import { ENGLISH } from "./constants/Languages";
import getLanguage from "./languages/lang";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const store = configureStore({
  ...window.INITIAL_STATE,
  lang: getLanguage(window.INITIAL_STATE.user.lang || ENGLISH)
}, cookies);

ReactDOM.hydrate(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>,
  document.getElementById("app")
);
