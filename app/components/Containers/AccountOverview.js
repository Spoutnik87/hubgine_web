import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { findIndex } from "lodash";
import { fetchAccountList } from "../../actions/accounts";
import { withLanguage } from "../withLanguage";
import { withMessages } from "../withMessages";
import TwitterAccountForm from "../Forms/TwitterAccountForm";
import CampaignList from "../CampaignList";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Container from "../Container";
import Panel from "../Panel";
import PrimaryButton from "../buttons/PrimaryButton";
import SuccessButton from "../buttons/SuccessButton";
import TwitterRuleForm from "../Forms/TwitterRuleForm";

class AccountOverview extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                accountId: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            editAccount: false,
            loadingAccountList: true,
            accountId: decodeURI(this.props.match.params.accountId),
            account: null
        };
    }

    componentDidMount()
    {
        const {
            accountId
        } = this.state;
        this.props.actions.fetchAccountList().then(() => {
            this.setState({
                loadingAccountList: false,
                account: this.props.accounts[findIndex(this.props.accounts, { name: this.state.accountId })]
            });
        }).catch(error => {});
    }

    render()
    {
        const {
            editAccount,
            loadingAccountList,
            accountId,
            account
        } = this.state;
        return (
            <Container>
                {
                    loadingAccountList ? (
                        <Panel title={accountId}>
                            <LoadingCog center />
                        </Panel>
                    ) : (
                        account ? (
                            <Panel title={<span>{accountId}{!editAccount && <PrimaryButton id="editCampaign" style={{ float: "right" }} onClick={this.handleClick}>Edit</PrimaryButton>}</span>}>
                                <Panel title="Campaigns :">
                                    <CampaignList account={account} campaigns={account.campaigns} onClick={this.handleCampaignSelection} />
                                </Panel>
                                <Panel title="Blacklist :">
                                    
                                </Panel>
                            </Panel>
                        ) : (
                            <Panel title={accountId}>
                                <Messages messages={this.props.messages} />
                                This account doesn't exist.
                            </Panel>
                        )
                    )
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchAccountList
        }, dispatch)
    };
};

export default withRouter(withMessages(withLanguage(connect(mapStateToProps, mapDispatchToProps)(AccountOverview))));