import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class LoggedInRoute extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    };

    render()
    {
        return this.props.isLoggedIn ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/signin" />;
    }
}

export default LoggedInRoute;