import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";

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

export default withLanguage(NotFound);