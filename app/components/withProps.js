import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Props from "../constants/Props";
import { fetchUser } from "../actions/user";
import { fetchAccountList } from "../actions/accounts";
import { clearMessages } from "../actions/messages";
import LoadingCog from "./LoadingCog";
import Messages from "./Messages";

/**
 * Load data into wrapped component.
 * @param {Component} WrappedComponent 
 * @param {Props} props 
 */
export const withProps = (WrappedComponent, props) => {
    class withProps extends Component {
        constructor(props)
        {
            super(props);
            this.state = {
                loadingUser: props.includes(Props.USER),
                loadingAccounts: props.includes(Props.ACCOUNTS)
            };
        }
        
        componentDidMount()
        {
            if (props.includes(Props.USER))
            {
                this.props.actions.fetchUser().then(() => {
                    this.setState({
                        loadingUser: false
                    });
                }).catch(() => {});
            }
            if (props.includes(Props.ACCOUNTS))
            {
                this.props.actions.fetchAccountList().then(() => {
                    this.setState({
                        loadingAccounts: false
                    });
                }).catch(() => {});
            }
        }

        componentWillUnmount()
        {
            if (data.includes(Props.MESSAGES))
            {
                this.props.actions.clearMessages();
            }
        }

        render()
        {
            const {
                loadingUser,
                loadingAccounts
            } = this.state;
            const loadingData = loadingUser || loadingAccounts;
            return loadingData ? (
                <Fragment>
                    <Messages messages={this.props.messages}/>
                    <LoadingCog center/>
                </Fragment>
            ) :  <WrappedComponent {...this.props}/>;
        }
    };

    const mapStateToProps = state => {
        let props = {
            messages: state.messages
        };
        for (const elem of data)
        {
            switch(elem)
            {
                case Props.USER:
                    props.user = state.user;
                    break;
                case Props.ACCOUNTS:
                    props.accounts = state.accounts.data;
                case Props.LANG:
                    props.lang = state.lang;
                    break;                    
            }
        }
        return props;
    };
    
    const mapDispatchToProps = dispatch => {
        return {
            actions: bindActionCreators({
                fetchUser,
                fetchAccountList,
                clearMessages
            }, dispatch)
        };
    };

    withProps.displayName = "withProps(" + getDisplayName(WrappedComponent) + ", " + data + ")";
    return connect(mapStateToProps, mapDispatchToProps)(withProps);
};

const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};