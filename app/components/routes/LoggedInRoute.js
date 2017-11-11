import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class LoggedInRoute extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        if (nextProps.isLoggedIn !== this.props.isLoggedIn || nextProps.path !== this.props.path)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    render()
    {
        return this.props.isLoggedIn ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/signin" />;
    }
}

export default LoggedInRoute;