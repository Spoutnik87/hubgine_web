import React from 'react';
import { connect } from 'react-redux';

class EnsureLoggedInContainer extends React.Component {
  constructor(props)
  {
      super(props);
  }

  componentWillMount()
  {
    if (this.props.user.token == null)
    {
      this.props.router.replace("/");
    }
  }

  render() {
    if (this.props.user.token != null)
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

export default connect(mapStateToProps)(EnsureLoggedInContainer);
