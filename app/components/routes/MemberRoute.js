import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class MemberRoute extends Component {
    static propTypes = {
        isMember: PropTypes.bool.isRequired
    };

    render()
    {
        return this.props.isMember ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/" />;
    }
}

export default MemberRoute;
