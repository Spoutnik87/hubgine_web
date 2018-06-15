import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class MemberRoute extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isMember: PropTypes.bool.isRequired,
        path: PropTypes.string,
        strict: PropTypes.bool,
        exact: PropTypes.bool,
        location: PropTypes.object,
        sensitive: PropTypes.bool
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
        const {
            isMember,
            ...props
        } = this.props;
        return isMember ? <Route {...props}/> : <Redirect to="/"/>;
    }
}

export default MemberRoute;
