import React, { Component } from "react";
import PropTypes from "prop-types";

class Messages extends Component {
  static propTypes = {
    messages: PropTypes.shape({
      success: PropTypes.arrayOf(PropTypes.shape({
        msg: PropTypes.string.isRequired
      })),
      error: PropTypes.arrayOf(PropTypes.shape({
        msg: PropTypes.string.isRequired
      })),
      info: PropTypes.arrayOf(PropTypes.shape({
        msg: PropTypes.string.isRequired
      }))}).isRequired
  };

  render()
  {
    return this.props.messages.success ? (
      <div role="alert" className="alert alert-success">
        {this.props.messages.success.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    ) : this.props.messages.error ? (
      <div role="alert" className="alert alert-danger">
        {this.props.messages.error.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    ) : this.props.messages.info ? (
      <div role="alert" className="alert alert-info">
        {this.props.messages.info.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    ) : null;
  }
}

export default Messages;
