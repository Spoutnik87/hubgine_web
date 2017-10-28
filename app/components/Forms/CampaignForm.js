import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import Form from "../Form";
import DateInput from "../Inputs/DateInput";
import ListInput from "../Inputs/ListInput";
import Messages from "../Messages";
import ToolTip from "../Tooltip";
import LoadingCog from "../LoadingCog";
import SuccessButton from "../buttons/SuccessButton";
import DangerButton from "../buttons/DangerButton";
import PrimaryButton from "../buttons/PrimaryButton";
import DefaultButton from "../buttons/DefaultButton";

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
        accounts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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
        accountId: PropTypes.string,
        campaign: PropTypes.shape({
            name: PropTypes.string.isRequired,
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
            accountId: this.props.accountId,
            name: this.props.campaign.name,
            dateBegin: this.props.campaign.dateBegin,
            dateEnd: this.props.campaign.dateEnd,
            deleteMode: false
        } : {
            accountId: this.props.accounts.length > 0 ? this.props.accounts[0] : "",
            name: "",
            dateBegin: "",
            dateEnd: "",
            deleteMode: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
    }

    handleClick(event)
    {
        const send = {
            name: this.props.name,
            result: {
                accountId: this.state.accountId,
                name: this.state.name,
                dateBegin: this.state.dateBegin,
                dateEnd: this.state.dateEnd
            }
        };
        if (this.props.campaign) send.default = {
            accountId: this.props.accountId,
            name: this.props.campaign.name,
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
        const buttonSubmit = this.props.loading ? <LoadingCog/> : this.props.edit ? <PrimaryButton id="buttonSubmit" onClick={this.handleClick}>{CAMPAIGNFORM_EDIT_BUTTON}</PrimaryButton> : <SuccessButton id="buttonSubmit" onClick={this.handleClick}>{CAMPAIGNFORM_CREATE_BUTTON}</SuccessButton>;
        const buttonDelete = this.props.delete && !this.props.loading && <DangerButton id="buttonDeleteMode" onClick={this.handleClick} style={{ marginRight: "20px" }}>{CAMPAIGNFORM_DELETE_BUTTON}</DangerButton>;
        const buttonCancel = this.props.cancel && !this.props.loading && <DefaultButton id="buttonCancel" onClick={this.handleClick}>{CAMPAIGNFORM_CANCEL_BUTTON}</DefaultButton>;
        const messages = this.props.messages && <Messages messages={this.props.messages}/>;
        const deleteMode = this.state.deleteMode ? this.props.loading ? <LoadingCog /> : <div className="col-sm-12"><DangerButton id="buttonDeleteYes" onClick={this.handleClick} style={{ marginRight: "20px" }}>{CAMPAIGNFORM_DELETE_BUTTON}</DangerButton>
            <DefaultButton id="buttonDeleteNo" onClick={this.handleClick}>{CAMPAIGNFORM_CANCEL_BUTTON}</DefaultButton></div>
            : <div className="col-sm-12">{buttonSubmit}<div style={{ float: "right" }}>{buttonDelete}{buttonCancel}</div></div>;
        return (
            <Form title={this.props.title ? this.props.edit ? CAMPAIGNFORM_EDIT_TITLE : CAMPAIGNFORM_CREATE_TITLE : null}>
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
                        <ListInput id="accountId" name="accountId" options={this.props.accounts} defaultOption={this.props.campaign ? this.props.accountId : undefined} onChange={this.handleAccountChange} disabled={this.props.campaign !== undefined} />
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
            </Form>
        );
    }
}

export default withLanguage(CampaignForm);