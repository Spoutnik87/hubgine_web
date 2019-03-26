import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class AdminRoute extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        path: PropTypes.string,
        strict: PropTypes.bool,
        exact: PropTypes.bool,
        location: PropTypes.object,
        sensitive: PropTypes.bool
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        if (nextProps.isAdmin !== this.props.isAdmin || nextProps.path !== this.props.path)
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
            isAdmin, 
            ...props
        } = this.props;
        return isAdmin ? <Route {...props}/> : <Redirect to="/"/>;
    }
}

export default AdminRoute;
