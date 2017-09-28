import React, { Component } from "react";
import { connect } from "react-redux";

export const withLanguage = (WrappedComponent) => {
    class WithLanguage extends Component {
        render()
        {
            return <WrappedComponent lang={this.props.lang} {...this.props} />;
        }
    };
    WithLanguage.displayName = "withLanguage(" + getDisplayName(WrappedComponent) + ")";
    return connect(mapStateToProps)(WithLanguage);
};

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};