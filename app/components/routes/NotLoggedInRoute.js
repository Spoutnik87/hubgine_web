import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class NotLoggedInRoute extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isNotLoggedIn: PropTypes.bool.isRequired
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
        return this.props.isNotLoggedIn ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/" />;
    }
}

export default NotLoggedInRoute;