import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Footer extends Component {
  static propTypes = {
    lang: PropTypes.shape({
      FOOTER_TITLE: PropTypes.string.isRequired
    }).isRequired
  };

  render()
  {
    const { FOOTER_TITLE } = this.props.lang;
    return (
      <footer>
        <p>{FOOTER_TITLE}</p>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang
  };
};

export default connect(mapStateToProps)(Footer);