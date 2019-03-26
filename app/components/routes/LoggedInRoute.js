import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class LoggedInRoute extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        path: PropTypes.string,
        strict: PropTypes.bool,
        exact: PropTypes.bool,
        location: PropTypes.object,
        sensitive: PropTypes.bool
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
        const {
            isLoggedIn,
            ...props
        } = this.props;
        return isLoggedIn ? <Route {...props}/> : <Redirect to="/signin"/>;
    }
}

export default LoggedInRoute;