import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import App from './components/App';
import { Router, browserHistory } from 'react-router';
import { CookiesProvider } from 'react-cookie';

const store = configureStore(window.INITIAL_STATE);

ReactDOM.render(
  
  <Provider store={store}>
    <CookiesProvider>
      <Router history={browserHistory} routes={getRoutes(store)} />
    </CookiesProvider>
  </Provider>,
  document.getElementById('app')
);
