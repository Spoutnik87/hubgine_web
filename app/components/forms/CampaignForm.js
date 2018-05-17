import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withData } from "../withData";
import * as Data from "../../constants/Data";
import Form from "../Form";
import DateInput from "../inputs/DateInput";
import ListInput from "../inputs/ListInput";
import Messages from "../Messages";
import LoadingCog from "../LoadingCog";
import Input from "../inputs/Input";
import SuccessButton from "../buttons/SuccessButton";
import DangerButton from "../buttons/DangerButton";
import SecondaryButton from "../buttons/SecondaryButton";
import FormGroup from "../FormGroup";

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
            CAMPAIGNFORM_NAME_TOOLTIP: PropTypes.string.isRequired,
            CAMPAIGNFORM_DATEBEGIN_TOOLTIP: PropTypes.string.isRequired
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
            dateBegin: PropTypes.number.isRequired,
            dateEnd: PropTypes.number.isRequired
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
            dateBegin: 0,
            dateEnd: 0,
            deleteMode: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            CAMPAIGNFORM_NAME_TOOLTIP,
            CAMPAIGNFORM_DATEBEGIN_TOOLTIP
        } = this.props.lang;
        const {
            title,
            edit,
            children,
            loading,
            cancel,
            messages,
            delete: hasDeleteButton,
            accounts,
            campaign,
            accountId
        } = this.props;
        const {
            deleteMode,
            name,
            dateBegin,
            dateEnd
        } = this.state;
        return (
            <Form title={title ? edit ? CAMPAIGNFORM_EDIT_TITLE : CAMPAIGNFORM_CREATE_TITLE : undefined}>
                {
                    messages && (
                        <Messages messages={messages}/>
                    )
                }
                <Input name="name" id="name" value={name} label={CAMPAIGNFORM_NAME} tooltip={CAMPAIGNFORM_NAME_TOOLTIP} onChange={this.handleChange} autoFocus/>
                <ListInput id="accountId" name="accountId" options={accounts} defaultOption={campaign ? accountId : undefined} label={CAMPAIGNFORM_ACCOUNT} onChange={this.handleChange} disabled={campaign !== undefined} />
                <DateInput id="dateBegin" name="dateBegin" value={dateBegin} label={CAMPAIGNFORM_DATEBEGIN} tooltip={CAMPAIGNFORM_DATEBEGIN_TOOLTIP + moment().format("Z")} onChange={this.handleChange}/>                
                <DateInput id="dateEnd" name="dateEnd" label={CAMPAIGNFORM_DATEEND} value={dateEnd} onChange={this.handleChange}/>
                <FormGroup>
                {
                    deleteMode ? (
                        loading ? (
                            <LoadingCog/>
                        ) : (
                            <Fragment>
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <DangerButton id="buttonDeleteYes" className="form-button"  onClick={this.handleClick}>{CAMPAIGNFORM_DELETE_BUTTON}</DangerButton>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <SecondaryButton id="buttonDeleteNo" className="form-button" onClick={this.handleClick}>{CAMPAIGNFORM_CANCEL_BUTTON}</SecondaryButton>
                                </div>
                            </Fragment>
                        )
                    ) : (
                        <div>
                        {
                            loading ? (
                                <LoadingCog/>
                            ) : (
                                <Fragment>
                                    <div className="col-xs-12 col-sm-12 col-md-12">
                                        <SuccessButton id="buttonSubmit" className="form-button" onClick={this.handleClick}>{edit ? CAMPAIGNFORM_EDIT_BUTTON : CAMPAIGNFORM_CREATE_BUTTON}</SuccessButton>
                                    </div>
                                    {
                                        hasDeleteButton && (
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <DangerButton id="buttonDeleteMode" className="form-button" onClick={this.handleClick}>{CAMPAIGNFORM_DELETE_BUTTON}</DangerButton>
                                            </div>
                                        )
                                    }
                                    {
                                        cancel && (
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <SecondaryButton id="buttonCancel" className="form-button" onClick={this.handleClick}>{CAMPAIGNFORM_CANCEL_BUTTON}</SecondaryButton>
                                            </div>
                                        )
                                    }
                                </Fragment>
                            )
                        }
                        </div>
                    )
                }
                </FormGroup>
                {children}
            </Form>
        );
    }
}

export default withData(CampaignForm, [ Data.LANG ]);