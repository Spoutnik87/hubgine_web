import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Data from "../constants/Data";
import { fetchUser } from "../actions/user";
import { fetchAccountList } from "../actions/accounts";
import { clearMessages } from "../actions/messages";
import LoadingCog from "./LoadingCog";
import Messages from "./Messages";

/**
 * 
 * @param {Component} WrappedComponent 
 * @param {Data} data 
 */
export const withData = (WrappedComponent, data) => {
    class WithData extends Component {
        constructor(props)
        {
            super(props);
            this.state = {
                loadingUser: data.includes(Data.USER),
                loadingAccounts: data.includes(Data.ACCOUNTS)
            };
        }
        
        componentDidMount()
        {
            for (const elem of data)
            {
                if (elem === Data.USER ||
                    elem === Data.ACCOUNTS)
                {
                    switch(elem)
                    {
                        case Data.USER:
                            this.props.actions.fetchUser().then(() => {
                                this.setState({
                                    loadingUser: false
                                });
                            }).catch(() => {});
                            break;
                        case Data.ACCOUNTS:
                            this.props.actions.fetchAccountList().then(() => {
                                this.setState({
                                    loadingAccounts: false
                                });
                            }).catch(() => {});
                            break;
                    }
                }    
            }
        }

        componentWillUnmount()
        {
            if (data.includes(Data.MESSAGES))
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
                case Data.USER:
                    props.user = state.user;
                    break;
                case Data.ACCOUNTS:
                    props.accounts = state.accounts.data;
                case Data.LANG:
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

    WithData.displayName = "withData(" + getDisplayName(WrappedComponent) + ", " + data + ")";
    return connect(mapStateToProps, mapDispatchToProps)(WithData);
};

const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};