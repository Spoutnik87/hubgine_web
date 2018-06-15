import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class NotLoggedInRoute extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isNotLoggedIn: PropTypes.bool.isRequired,
        path: PropTypes.string,
        strict: PropTypes.bool,
        exact: PropTypes.bool,
        location: PropTypes.object,
        sensitive: PropTypes.bool
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        if (nextProps.isNotLoggedIn !== this.props.isNotLoggedIn || nextProps.path !== this.props.path)
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
            isNotLoggedIn,
            ...props
        } = this.props;
        return this.props.isNotLoggedIn ? <Route {...props}/> : <Redirect to="/"/>;
    }
}

export default NotLoggedInRoute;