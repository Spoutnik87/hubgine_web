import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAccountList } from "../../actions/accounts";
import { updateCampaignList } from "../../actions/campaigns";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage, clearMessages } from "../../actions/messages";
import LoadingCog from "../LoadingCog";

class UserDashboard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount()
    {
        this.setState({
            loading: true
        });
        this.props.actions.fetchAccountList().then(() => {
            this.setState({
                loading: false
            });
        });
    }

    componentWillUnmount()
    {
        this.props.actions.clearMessages();
    }
    

    render()
    {
        return (
            <div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        campaigns: state.campaigns,
        messages: state.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            clearMessages,
            fetchAccountList
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);