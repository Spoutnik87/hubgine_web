import React, { Component } from "react";
import { getAccountList } from "../util/api";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { updateAccountList } from "../actions/accounts";
import LoadingCog from "./LoadingCog";
import AccountTile from "./AccountTile";
import { sendFailureMessage } from "../actions/messages";
import AccountOverview from "./AccountOverview";

class UserDashboard extends Component {
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
        getAccountList(this.props.user.email, this.props.user.token, (error, result) => {
            if (!error)
            {
                this.props.dispatch(updateAccountList(result.accounts));
                this.setState({ isLoaded: true });
            }
            else
            {
                this.props.dispatch(sendFailureMessage([{ msg: "An error happened during account list loading." }]));
            }
        });
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
                    this.props.accounts.list.map((account, index) => (
                        <div key={index} className="col-md-4 col-sm-6">
                            <AccountTile account={account} href={"#" + index}/>
                        </div>
                    )));
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
                    tab = <AccountOverview account={this.props.accounts.list[this.props.location.hash.substring(1)]} />;
                }
                else if (settingsActive)
                {

                }
            }
        }
        else
        {
            tabs = (
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
                            {tabs}
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        );
    }
}

UserDashboard.propTypes = {
    messages: PropTypes.object,
    lang: PropTypes.object,
    user: PropTypes.object,
    accounts: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        lang: state.lang,
        user: state.user,
        accounts: state.accounts
    };
};

export default withRouter(connect(mapStateToProps)(UserDashboard));