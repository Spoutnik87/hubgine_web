import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearMessages } from "../actions/messages";

export const withMessages = (WrappedComponent) => {
    class WithMessages extends Component {
        componentWillUnmount()
        {
            this.props.actions.clearMessages();
        }

        render()
        {
            return <WrappedComponent messages={this.props.messages} {...this.props} />;
        }
    };
    WithMessages.displayName = "withMessages(" + getDisplayName(WrappedComponent) + ")";
    return connect(mapStateToProps, mapDispatchToProps)(WithMessages);
};

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            clearMessages
        }, dispatch)
    };
};