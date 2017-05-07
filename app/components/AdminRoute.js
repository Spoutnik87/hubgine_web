import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ranks from "../constants/Ranks";

class AdminRoute extends Component {
    render()
    {
        return this.props.user.rank == ranks.ADMIN ? <Route path={this.props.path} {...this.props.strict} {...this.props.exact} component={this.props.component} /> : <Redirect to="/" />;
    }
}

AdminRoute.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(AdminRoute);
