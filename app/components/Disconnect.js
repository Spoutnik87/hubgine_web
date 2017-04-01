import React from 'react';
import { disconnect } from '../actions/user';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

class Disconnect extends React.Component {
  constructor(props)
  {
      super(props);
  }
  
  componentWillMount()
  {
      this.props.dispatch(disconnect());
      cookie.save('user', {});
      this.props.router.push("/");
  }

  render()
  {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Disconnect);
