// Newrelic Node.js agent
require('newrelic');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Provider = require('react-redux').Provider;
const mime = require('mime');

const Router = require('react-router-dom');
const CookiesProvider = require('react-cookie').CookiesProvider;
const cookiesMiddleware = require('universal-cookie-express');
const favicon = require('serve-favicon');

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// React and Server-Side Rendering
const configureStore = require('./app/store/configureStore').default;
const lang = require('./app/languages/lang');
const App = require('./app/components/App');

var app = express();

var server = require('http').Server(app);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookiesMiddleware());
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: res => {
        res.setHeader('Content-Type', mime.lookup(res.req.url));
    }
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// React server rendering
app.use((req, res) => {
  const user = req.universalCookies.get('user') || {};
  const initialState = {
    messages: {},
    user: user,
    profile: {},
    accounts: [],
    lang: lang.default(user.lang || lang.ENGLISH),
  };
  const store = configureStore(initialState);
  const context = {};

  const html = ReactDOM.renderToString(
    React.createElement(Provider, { store: store }, 
      React.createElement(CookiesProvider, { cookies: req.universalCookies }, 
        React.createElement(Router.StaticRouter, { location: req.url, context: context },
          React.createElement(App.default)
    ))));

    if (context.url)
    {
      res.redirect(302, context.url);
    }
    else
    {
      res.render('layout', {
        html: html,
        initialState: store.getState()
      });
    }
});

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
