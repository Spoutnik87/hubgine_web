import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Footer extends Component {
  render()
  {
    return (
      <footer>
        <p>{this.props.lang.FOOTER_TITLE}</p>
      </footer>
    );
  }
}

Footer.propTypes = {
  lang: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    lang: state.lang
  };
};

export default connect(mapStateToProps)(Footer);