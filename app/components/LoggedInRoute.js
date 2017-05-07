import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class LoggedInRoute extends Component {
    render()
    {
        return this.props.user.token != null ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/signin" />;
    }
}

LoggedInRoute.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(LoggedInRoute);