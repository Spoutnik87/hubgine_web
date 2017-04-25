import React from 'react';
import { disconnect } from '../actions/user';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

class Disconnect extends React.Component { 
  componentWillMount()
  {
      this.props.dispatch(disconnect());
      this.props.cookies.remove('user');
      this.props.router.push("/");
  }

  render()
  {
    return null;
  }
}

export default connect()(withCookies(Disconnect));
