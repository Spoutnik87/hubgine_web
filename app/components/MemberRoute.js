import React, { Component } from 'react';
import { Route as RouterRoute, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class MemberRoute extends Component {
    render() {
        return (
            this.props.user.token != null
            ?
            <RouterRoute path={this.props.path} {...this.props.exact} component={this.props.component} />
            :
            <Redirect to="/signin" />
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(MemberRoute);