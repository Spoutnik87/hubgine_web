import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NotFound extends Component {
  static propTypes = {
    lang: PropTypes.shape({
      NOTFOUND_TITLE: PropTypes.string.isRequired
    }).isRequired
  };

  render()
  {
    const { NOTFOUND_TITLE } = this.props.lang;
    return (
      <div className="container text-center">
        <h1>404</h1>
        <p>{NOTFOUND_TITLE}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang
  };
};

export default connect(mapStateToProps)(NotFound);
