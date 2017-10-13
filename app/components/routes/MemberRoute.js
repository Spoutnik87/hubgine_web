import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class MemberRoute extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isMember: PropTypes.bool.isRequired
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        if (nextProps.isMember !== this.props.isMember || nextProps.path !== this.props.path)
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
        return this.props.isMember ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/" />;
    }
}

export default MemberRoute;
