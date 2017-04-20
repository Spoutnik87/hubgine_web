import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import App from './components/App';

const store = configureStore(window.INITIAL_STATE);

const clearMessages = () => {
  store.dispatch({
    type: 'CLEAR_MESSAGES'
  });
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
