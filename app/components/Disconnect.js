import React from 'react';
import { disconnect } from '../actions/user';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

class Disconnect extends React.Component { 
  componentWillMount()
  {
      this.props.dispatch(disconnect());
      cookie.remove('user');
      this.props.router.push("/");
  }

  render()
  {
    return null;
  }
}

export default connect()(Disconnect);
