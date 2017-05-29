import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class AdminRoute extends Component {
    static propTypes = {
        isAdmin: PropTypes.bool.isRequired
    };

    render()
    {
        return this.props.isAdmin ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/" />;
    }
}

export default AdminRoute;
