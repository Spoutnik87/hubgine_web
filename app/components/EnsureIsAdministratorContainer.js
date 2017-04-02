import React from 'react';
import { connect } from 'react-redux';
import * as ranks from '../constants/Ranks';

class EnsureIsAdministratorContainer extends React.Component {
  componentWillMount()
  {
    if (this.props.user.rank != ranks.ADMIN)
    {
      this.props.router.push("/");
    }
  }

  render() {
    if (this.props.user.rank == ranks.ADMIN)
    {
      return this.props.children;
    }
    else
    {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(EnsureIsAdministratorContainer);
