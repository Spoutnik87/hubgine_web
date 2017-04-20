// Newrelic Node.js agent
require('newrelic');

const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router-dom').Router;
const StaticRouter = require('react-router-dom').StaticRouter;
const RouterContext = require('react-router-dom').RouterContext;
//const matchf = require('react-router').match;
const Provider = require('react-redux').Provider;
const cookie = require('react-cookie');
const mime = require('mime');

const matchPath = require('react-router-dom').matchPath;
const RouterMatch = require('react-router-dom');
const favicon = require('serve-favicon');
// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Controllers
var contactController = require('./controllers/contact');

// React and Server-Side Rendering
const routes = require('./app/routes');
const App = require('./app/server');
const configureStore = require('./app/store/configureStore').default;

var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),  {
    setHeaders: function (res) {
      const type = mime.lookup(res.req.url)
        res.setHeader('Content-Type', type);
    }
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.post('/contact', contactController.contactPost);

// React server rendering
app.use(function(req, res) {
  cookie.setRawCookie(req.headers.cookie);
  const initialState = {
    messages: {},
    user: cookie.load('user') || {},
    profile: {}
  };
  const store = configureStore(initialState);




  const routesProps = routes.default();
  const context = {};
  const html = ReactDOM.renderToString(
    App.default(req.url, context, store)
  );
  console.log("dd" + JSON.stringify(routesProps));
  let match = false;
  routesProps.some(route => {
    if (matchPath(req.url, route)) match = true;
    return match;
  });
  if (context.url)
  {
    res.writeHead(301, { Location: context.url });
    res.end();
  }
  else if (match)
  {
    console.log(html);
    res.render('layout', {
      html: html,
      initialState: store.getState()
    });
  }
  else
  {
    res.sendStatus(404);
  }
  console.log("ee " + JSON.stringify(context));






  /*const match = matchPath(req.url, initRoutes);
  
  console.log(JSON.stringify(initRoutes) + JSON.stringify(match));
  if (match)
  {
    console.log(match.component);
  }*/
 /* const promises = [];
  initRoutes.some(route => {
    const match = matchPath(req.url, route);
    if (match)
    {

      promises.push(ReactDOM.renderToString(route.component));*/
      /*var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        React.createElement(RouterContext, route.component)
      ));
      res.render('layout', {
        html: html,
        initialState: store.getState()
      });*/
   /* }
    return match;
  });
  Promise.all(promises).then(data => {
    console.log(data);
  });*/

  /*initRoutes.map(route => {
    const match = matchPath(req.url, route);
    console.log("aa " + JSON.stringify(match));
    console.log("bb " + JSON.stringify(route));
  });*/






  /*if (match)
  {
    const a = React.createElement(RouterContext, route.props);
    console.log("bbbbbbbbbb" + JSON.stringify(a));*/
    //const data = route.loadData(match);
    /*var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        a
      ));
      res.render('layout', {
        html: html,
        initialState: store.getState()
      });*/
  //}
  /*RouterMatch({ routes: routes.default(store).default, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        React.createElement(RouterContext, renderProps)
      ));
      res.render('layout', {
        html: html,
        initialState: store.getState()
      });
    } else {
      res.sendStatus(404);
    }
  });*/
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
