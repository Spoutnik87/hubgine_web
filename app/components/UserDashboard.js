import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateAccountList } from "../actions/accounts";
import { sendFailureMessage, clearMessages } from "../actions/messages";
import * as Ranks from "../constants/Ranks";
import * as Languages from "../constants/Languages";
import { getAccountNameList } from "../util/api";
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
            loading: true,
            editMode: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount()
    {
        getAccountNameList(this.props.user.email, this.props.user.token, (error, result) => {
            if (!error)
            {
                this.props.dispatch(updateAccountList(result.accounts));
            }
            else
            {
                this.props.dispatch(sendFailureMessage("An error happened during account list loading."));
            }
            this.setState({
                loading: false
            });
        });
    }
    
    componentWillMount()
    {
        this.props.dispatch(clearMessages());
    }

    handleClick(event)
    {
        if (event.target.id === "manageaccount")
        {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }
    
    render()
    {
        const manageButton = !this.state.editMode ? <button id="manageaccount" type="submit" className="btn btn-primary" onClick={this.handleClick} style={{float: "right" }}><i className="fa fa-wrench"></i> Manage</button>
            : <button id="manageaccount" type="submit" className="btn btn-primary" onClick={this.handleClick} style={{float: "right" }}><i className="fa fa-level-up"></i> Return</button>;
        const selectedMenu = !this.state.editMode ? <AccountOverview account={this.props.accounts.filter(account => { return decodeURI(this.props.location.hash.substring(1)) === account.name ? true : false; })[0]} />
            : <AccountSettings account={this.props.accounts.filter(account => { return decodeURI(this.props.location.hash.substring(1)) === account.name ? true : false; })[0]} /> 
        
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">DASHBOARD</h3>
                    </div>
                    <div className="panel-body">
                        <div className="col-sm-12">
                            {manageButton}
                        </div>
                    {selectedMenu}
                    </div>
                </div>
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

export default connect(mapStateToProps)(UserDashboard);