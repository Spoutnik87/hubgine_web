//New Relic performance monitoring
require("newrelic");
const express = require("express");
const path = require("path");
const morganLogger = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const React = require("react");
const ReactDOM = require("react-dom/server");
const Provider = require("react-redux").Provider;
const mime = require("mime");

const Router = require("react-router-dom");
const cookiesMiddleware = require("universal-cookie-express");
const favicon = require("serve-favicon");
const winston = require("winston");

// ES6 Transpiler
require("babel-core/register");
require("babel-polyfill");

// React and Server-Side Rendering
const configureStore = require("./app/store/configureStore").default;
const lang = require("./app/languages/lang");
const App = require("./app/components/App").default;
const config = require("./server-config.json");

//Winston Logger
const logger = new winston.createLogger({
    level: config.logger.level,
    transports: [
        new winston.transports.Console({
            colorize: true
        }),
        new winston.transports.File({
            filename: "combined.log"
        })
    ]
});

let app = express();
const NODE_ENV = process.env.NODE_ENV || "development";
logger.info("Le serveur a été initialisé en mode : " + NODE_ENV);
let server = require("http").Server(app);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", config.port);
app.use(compression());
app.use(morganLogger(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookiesMiddleware());
app.all("/css/*.scss", (req, res, next) => {
    res.status(403).end("forbidden");
});
app.use(express.static(path.join(__dirname, "public"), {
    setHeaders: res => {
        res.setHeader("Content-Type", mime.getType(res.req.url));
    }
}));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// React server rendering
app.use((req, res) => {
    const user = req.universalCookies.get("user") || {};
    const initialState = {
        messages: {},
        user: user,
        accounts: {
            data: []
        }
    };
    const store = configureStore({
        ...initialState,
        lang: lang.default(user.lang)
    }, req.universalCookies);
    const context = {};

    const html = ReactDOM.renderToString(
        React.createElement(Provider, { store },
            React.createElement(Router.StaticRouter, { location: req.url, context },
                React.createElement(App)
            )
        )
    );

    if (context.url)
    {
        res.redirect(302, context.url);
    }
    else
    {
        res.render("layout", {
            html: html,
            initialState: {
                ...store.getState(),
                user: {},
                lang: {}
            }
        });
    }
});

// Production error handler
if (NODE_ENV === "production")
{
    app.use((err, req, res, next) => {
        logger.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

server.listen(app.get("port"), () => {
    logger.info("Le serveur est executé sur le port : " + app.get("port"));
});

module.exports = app;
