import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from './components/App';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux';

export default function getStaticRouter(url, context, store) {

  const sr = (
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );
  return sr;
}
