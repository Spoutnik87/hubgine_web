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
            }))
        }).isRequired
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.messages !== this.props.messages;
    }

    render()
    {
        const { messages } = this.props;
        return messages.success ? (
            <div role="alert" className="alert alert-success">
                {messages.success.map((message, index) => <div key={index}>{message.msg}</div>)}
            </div>
        ) : messages.error ? (
            <div role="alert" className="alert alert-danger">
                {messages.error.map((message, index) => <div key={index}>{message.msg}</div>)}
            </div>
        ) : messages.info ? (
            <div role="alert" className="alert alert-info">
                {messages.info.map((message, index) => <div key={index}>{message.msg}</div>)}
            </div>
        ) : null;
    }
}

export default Messages;