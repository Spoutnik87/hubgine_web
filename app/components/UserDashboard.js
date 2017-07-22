import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { updateAccountList } from "../actions/accounts";
import { sendFailureMessage, clearMessages } from "../actions/messages";
import * as Ranks from "../constants/Ranks";
import * as Languages from "../constants/Languages";
import { getAccountNameList, getTwitterAccount } from "../util/api";
import LoadingCog from "./LoadingCog";
import AccountTile from "./AccountTile";
import AccountOverview from "./AccountOverview";
import AccountSettings from "./AccountSettings";

class UserDashboard extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        lang: PropTypes.shape({

        }).isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
            rank: PropTypes.oneOf(Object.values(Ranks)).isRequired,
            lang: PropTypes.oneOf(Object.values(Languages)).isRequired
        }).isRequired,
        accounts: PropTypes.array.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false,
            tabsMenu: "Overview"
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount()
    {
        getAccountNameList(this.props.user.email, this.props.user.token, (error, result) => {
            if (!error)
            {
                this.props.dispatch(updateAccountList(result.accounts));
                this.setState({ isLoaded: true });
            }
            else
            {
                this.props.dispatch(sendFailureMessage("An error happened during account list loading."));
            }
        });
        /*if (this.props.location.hash === "")
        {
            getAccountNameList(this.props.user.email, this.props.user.token, (error, result) => {
                if (!error)
                {
                    this.props.dispatch(updateAccountList(result.accounts));
                    this.setState({ isLoaded: true });
                }
                else
                {
                    this.props.dispatch(sendFailureMessage("An error happened during account list loading."));
                }
            });
        }
        else
        {
            const id = this.props.location.hash.substring(1);
            getTwitterAccount(this.props.user.email, this.props.user.token, id, (error, result) => {
                if (!error)
                {
                    console.log(result);
                    this.setState({
                        isLoaded: true
                    });
                }
                else
                {
                    this.props.dispatch(sendFailureMessage("An error happened during account loading."));
                }
            });
        }*/
    }
    
    componentWillMount() {
        this.props.dispatch(clearMessages());
    }

    handleClick(event)
    {
        if (event.target.id === "returnMenu")
        {
            this.props.history.push(this.props.location.pathname);
        }
        else
        {
            if (this.state.tabsMenu !== event.target.id)
            {
                this.setState({
                    tabsMenu: event.target.id
                });
            }
        }
    }
    
    render()
    {
        let tiles;
        let menu;
        let tab;
        if (this.state.isLoaded)
        {
            const overviewActive = this.state.tabsMenu === "Overview";
            const settingsActive = this.state.tabsMenu === "Settings";
            if (this.props.location.hash === "")
            {
                tiles = (
                    this.props.accounts.map(account => (
                        <div key={account.uid} className="col-md-4 col-sm-6">
                            <AccountTile account={account} href={"#" + encodeURI(account.name)}/>
                        </div>
                    ))
                );
            }
            else
            {
                menu = (
                    <div>
                        <ul className="nav nav-tabs account-tab-return">
                            <li onClick={this.handleClick}><a id="returnMenu">Return to menu <i className="fa fa-level-up"></i></a></li>
                        </ul>
                        <ul className="nav nav-tabs">
                            <li className={this.state.tabsMenu === "Overview" ? "active" : "account-tab-option"} onClick={this.handleClick}><a id="Overview">Overview</a></li>
                            <li className={this.state.tabsMenu === "Settings" ? "active" : "account-tab-option"} onClick={this.handleClick}><a id="Settings">Settings</a></li>
                        </ul>
                    </div>
                );

                if (overviewActive)
                {
                    tab = <AccountOverview account={this.props.accounts.filter(account => { return decodeURI(this.props.location.hash.substring(1)) === account.name ? true : false; })[0]} />;
                }
                else if (settingsActive)
                {
                    tab = <AccountSettings account={this.props.accounts.filter(account => { return decodeURI(this.props.location.hash.substring(1)) === account.name ? true : false; })[0]} />;
                }
            }
        }
        else
        {
            tab = (
                <div className="panel-body" style={ { textAlign: "center" } }>
                    <LoadingCog/>
                </div>
            );
        }

        return (
            <div>
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">DASHBOARD</h3>
                        </div>
                        <div className="panel-body">
                            {tiles}
                            {menu}
                            {tab}
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        lang: state.lang,
        user: state.user,
        accounts: state.accounts
    };
};

export default withRouter(connect(mapStateToProps)(UserDashboard));