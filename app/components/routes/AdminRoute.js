import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class AdminRoute extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isAdmin: PropTypes.bool.isRequired
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
        return this.props.isAdmin ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/" />;
    }
}

export default AdminRoute;
