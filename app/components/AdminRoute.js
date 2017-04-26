import React, { Component } from 'react';
import { Route as RouterRoute, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ranks from '../constants/Ranks';

class AdminRoute extends Component {
    render() {
        return (
            this.props.user.rank == ranks.ADMIN
            ?
            <RouterRoute path={this.props.path} {...this.props.exact} component={this.props.component} />
            :
            <Redirect to="/" />
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(AdminRoute);
