import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import { getAccountList } from "../../net/Requests";
import { sendFailureMessage, sendFailureMessages, sendSuccessMessage, clearMessages } from "../../actions/messages";
import { updateAccountList } from "../../actions/accounts";
import DateInput from "../Inputs/DateInput";
import ListInput from "../Inputs/ListInput";
import Messages from "../Messages";
import ToolTip from "../Tooltip";
import LoadingCog from "../LoadingCog";

class CampaignForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            CAMPAIGNFORM_GENERIC_ERROR: PropTypes.string.isRequired,
            CAMPAIGNFORM_CREATE_TITLE: PropTypes.string.isRequired,
            CAMPAIGNFORM_EDIT_TITLE: PropTypes.string.isRequired,
            CAMPAIGNFORM_CREATE_BUTTON: PropTypes.string.isRequired,
            CAMPAIGNFORM_EDIT_BUTTON: PropTypes.string.isRequired,
            CAMPAIGNFORM_CANCEL_BUTTON: PropTypes.string.isRequired,
            CAMPAIGNFORM_DELETE_BUTTON: PropTypes.string.isRequired,
            CAMPAIGNFORM_NAME: PropTypes.string.isRequired,
            CAMPAIGNFORM_ACCOUNT: PropTypes.string.isRequired,
            CAMPAIGNFORM_DATEBEGIN: PropTypes.string.isRequired,
            CAMPAIGNFORM_DATEEND: PropTypes.string.isRequired,
            CAMPAIGNFORM_NAME_TOOLTIP: PropTypes.string.isRequired
        }).isRequired,
        accounts: PropTypes.array.isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        cancel: PropTypes.bool,
        onCancel: PropTypes.func,
        delete: PropTypes.bool,
        onDelete: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        edit: PropTypes.bool,
        messages: PropTypes.object,
        campaign: PropTypes.shape({
            name: PropTypes.string.isRequired,
            accountId: PropTypes.string.isRequired,
            dateBegin: PropTypes.string.isRequired,
            dateEnd: PropTypes.string.isRequired
        })
    };

    static defaultProps = {
        name: "campaignform",
        onSubmit: () => {},
        cancel: false,
        onCancel: () => {},
        delete: false,
        onDelete: () => {},
        title: true,
        loading: false,
        edit: false,
        messages: undefined,
        campaign: undefined,
        accounts: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = this.props.campaign ? {
            name: this.props.campaign.name,
            accountId: this.props.campaign.accountId,
            dateBegin: this.props.campaign.dateBegin,
            dateEnd: this.props.campaign.dateEnd,
            deleteMode: false,
            isAccountListLoaded: false
        } : {
            name: "",
            accountId: this.props.accounts.length > 0 ? this.props.accounts[0].name : "",
            dateBegin: "",
            dateEnd: "",
            deleteMode: false,
            isAccountListLoaded: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
    }

    /*componentDidMount()
    {
        const {
            CAMPAIGNFORM_GENERIC_ERROR
        } = this.props.lang;
        getAccountList(this.props.user.email, this.props.user.token, this.props.accounts, (error, result) => {
            if (!error)
            {
                if (result)
                {
                    this.props.dispatch(updateAccountList(result.accounts));
                }
            }
            else
            {
                this.props.dispatch(sendFailureMessage(CAMPAIGNFORM_GENERIC_ERROR));
            }
            this.setState({
                isAccountListLoaded: true
            });
        });
    }*/

    handleClick(event)
    {
        const send = {
            name: this.props.name,
            result: {
                name: this.state.name,
                accountId: this.state.accountId,
                dateBegin: this.state.dateBegin,
                dateEnd: this.state.dateEnd
            }
        };
        if (this.props.campaign) send.default = {
            name: this.props.campaign.name,
            accountId: this.props.campaign.accountId,
            dateBegin: this.props.campaign.dateBegin,
            dateEnd: this.props.campaign.dateEnd
        };
        if (event.target.id === "buttonSubmit")
        {
            this.props.onSubmit(send);
        }
        else if (event.target.id === "buttonCancel")
        {
            this.props.onCancel(send);
        }
        else if (event.target.id === "buttonDeleteMode")
        {
            this.setState({
               deleteMode: true
            });
        }
        else if (event.target.id === "buttonDeleteYes")
        {
            this.props.onDelete(send);
        }
        else if (event.target.id === "buttonDeleteNo")
        {
            this.setState({
                deleteMode: false
            });
        }
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDateChange(event)
    {
        this.setState({
            [event.name]: event.value
        });
    }

    handleAccountChange(event)
    {
        this.setState({
           [event.name]: event.value
        });
    }

    render()
    {
        const {
            CAMPAIGNFORM_CREATE_TITLE,
            CAMPAIGNFORM_EDIT_TITLE,
            CAMPAIGNFORM_CREATE_BUTTON,
            CAMPAIGNFORM_EDIT_BUTTON,
            CAMPAIGNFORM_CANCEL_BUTTON,
            CAMPAIGNFORM_DELETE_BUTTON,
            CAMPAIGNFORM_NAME,
            CAMPAIGNFORM_ACCOUNT,
            CAMPAIGNFORM_DATEBEGIN,
            CAMPAIGNFORM_DATEEND,
            CAMPAIGNFORM_NAME_TOOLTIP
        } = this.props.lang;
        const buttonSubmit = this.props.loading ? <LoadingCog/> : this.props.edit ? <button id="buttonSubmit" className="btn btn-primary" onClick={this.handleClick}>{CAMPAIGNFORM_EDIT_BUTTON}</button> : <button id="buttonSubmit" className="btn btn-success" onClick={this.handleClick}>{CAMPAIGNFORM_CREATE_BUTTON}</button>;
        const buttonDelete = this.props.delete && !this.props.loading && <button id="buttonDeleteMode" className="btn btn-danger" onClick={this.handleClick} style={{ marginRight: "20px" }}>{CAMPAIGNFORM_DELETE_BUTTON}</button>;
        const buttonCancel = this.props.cancel && !this.props.loading && <button id="buttonCancel" className="btn btn-default" onClick={this.handleClick}>{CAMPAIGNFORM_CANCEL_BUTTON}</button>;
        const title = this.props.title && <div className="panel-heading"><h3 className="panel-title">{this.props.edit ? CAMPAIGNFORM_EDIT_TITLE : CAMPAIGNFORM_CREATE_TITLE}</h3></div>;
        const messages = this.props.messages && <Messages messages={this.props.messages}/>;
        const deleteMode = this.state.deleteMode ? this.props.loading ? <LoadingCog /> : <div className="col-sm-12"><button id="buttonDeleteYes" className="btn btn-danger" onClick={this.handleClick} style={{ marginRight: "20px" }}>{CAMPAIGNFORM_DELETE_BUTTON}</button>
            <button id="buttonDeleteNo" className="btn btn-default" onClick={this.handleClick}>{CAMPAIGNFORM_CANCEL_BUTTON}</button></div>
            : <div className="col-sm-12">{buttonSubmit}<div style={{ float: "right" }}>{buttonDelete}{buttonCancel}</div></div>;
        return (
            <div>
                {title}
                {
                    this.state.isAccountListLoaded ?
                    <div className="panel-body form-horizontal">
                        {messages}
                        <div className="form-group">
                            <div className="col-sm-2">
                                <label>
                                    {CAMPAIGNFORM_NAME}
                                </label>
                                <span style={{ float: "right" }}>
                                    <ToolTip>
                                        {CAMPAIGNFORM_NAME_TOOLTIP}
                                    </ToolTip>
                                </span>
                            </div>
                            <div className="col-sm-10">
                                <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.handleChange} autoFocus value={this.state.name}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="account" className="col-sm-2">{CAMPAIGNFORM_ACCOUNT}</label>
                            <div className="col-sm-10">
                                <ListInput id="accountId" name="accountId" options={this.props.accounts.map(account => account.name)} defaultOption={this.props.campaign ? this.props.campaign.accountId : undefined} onChange={this.handleAccountChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateBegin" className="col-sm-2">{CAMPAIGNFORM_DATEBEGIN}</label>
                            <div className="col-sm-10">
                                <DateInput id="dateBegin" name="dateBegin" onChange={this.handleDateChange} value={this.state.dateBegin}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateEnd" className="col-sm-2">{CAMPAIGNFORM_DATEEND}</label>
                            <div className="col-sm-10">
                                <DateInput id="dateEnd" name="dateEnd" onChange={this.handleDateChange} value={this.state.dateEnd}/>
                            </div>
                        </div>
                        <div className="form-group">
                            {deleteMode}
                        </div>
                        {this.props.children}
                    </div>
                    : <LoadingCog center />
                }
            </div>
        );
    }
}

export default withLanguage(CampaignForm);
