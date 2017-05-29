import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class NotLoggedInRoute extends Component {
    static propTypes = {
        isNotLoggedIn: PropTypes.bool.isRequired
    };

    render()
    {
        return this.props.isNotLoggedIn ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/" />;
    }
}

export default NotLoggedInRoute;