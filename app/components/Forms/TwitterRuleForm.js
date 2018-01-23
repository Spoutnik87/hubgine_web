import React, { Component } from "react";
import PropTypes from "prop-types";
import { invert } from "lodash";
import { withLanguage } from "../withLanguage";
import LoadingCog from "../LoadingCog";
import ArrayInput from "../Inputs/ArrayInput";
import ListInput from "../Inputs/ListInput";
import NumberInput from "../Inputs/NumberInput";
import Switch from "../Inputs/Switch";
import Messages from "../Messages";
import Form from "../Form";
import Input from "../Inputs/Input";
import SuccessButton from "../buttons/SuccessButton";
import DangerButton from "../buttons/DangerButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ToolTip from "../Tooltip";
import * as TwitterRuleTypes from "../../constants/TwitterRuleTypes";
import * as TwitterRuleConditions from "../../constants/TwitterRuleConditions";
import * as TwitterRuleLangs from "../../constants/TwitterRuleLangs";

class TwitterRuleForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            TWITTERRULEFORM_CREATE_TITLE: PropTypes.string.isRequired,
            TWITTERRULEFORM_EDIT_TITLE: PropTypes.string.isRequired,
            TWITTERRULEFORM_CREATE_BUTTON: PropTypes.string.isRequired,
            TWITTERRULEFORM_EDIT_BUTTON: PropTypes.string.isRequired,
            TWITTERRULEFORM_CANCEL_BUTTON: PropTypes.string.isRequired,
            TWITTERRULEFORM_DELETE_BUTTON: PropTypes.string.isRequired,
            TWITTERRULEFORM_NAME: PropTypes.string.isRequired,
            TWITTERRULEFORM_ACTION: PropTypes.string.isRequired,
            TWITTERRULEFORM_CONDITION: PropTypes.string.isRequired,
            TWITTERRULEFORM_KEYWORDS: PropTypes.string.isRequired,
            TWITTERRULEFORM_LANGUAGES: PropTypes.string.isRequired,
            TWITTERRULEFORM_DELAY: PropTypes.string.isRequired,
            TWITTERRULEFORM_LANG_TOOLTIP: PropTypes.string.isRequired
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
        rule: PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.number.isRequired,
            messages: PropTypes.arrayOf(PropTypes.string.isRequired),
            condition: PropTypes.string.isRequired,
            track: PropTypes.array.isRequired,
            delay: PropTypes.number.isRequired,
            lang: PropTypes.array.isRequired
        }),
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "twitterrule",
        onSubmit: () => {},
        cancel: false,
        onCancel: () => {},
        delete: false,
        onDelete: () => {},
        title: true,
        loading: false,
        edit: false,
        rule: undefined,
        messages: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = this.props.rule ? {
            name: this.props.rule.name,
            type: invert(TwitterRuleTypes)[this.props.rule.type],
            messages: this.props.rule.messages,
            condition: invert(TwitterRuleConditions)[this.props.rule.condition],
            track: this.props.rule.track,
            lang: this.props.rule.lang.map(l => invert(TwitterRuleLangs)[l]),
            delay: this.props.rule.delay,
            deleteMode: false
        } : {
            name: "",
            type: Object.keys(TwitterRuleTypes)[0],
            messages: [],
            condition: Object.keys(TwitterRuleConditions)[0],
            track: [],
            lang: [],
            delay: 0,
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
                name: this.state.name,
                type: TwitterRuleTypes[this.state.type],
                messages: TwitterRuleTypes[this.state.type] === TwitterRuleTypes.TWEET ? this.state.messages : null,
                track: this.state.track,
                condition: TwitterRuleConditions[this.state.condition],
                delay: this.state.delay,
                lang: this.state.lang.map(elem => TwitterRuleLangs[elem])
            }
        };
        if (this.props.rule != null)
        {
            send.ruleId = this.props.rule.name;
        }
        if (event.target.id === "buttonSubmit")
        {
            this.props.onSubmit(send);
        }
        else if (event.target.id == "buttonCancel")
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
            [event.name]: event.value || event.values
        });
    }

    render()
    {
        const {
            TWITTERRULEFORM_CREATE_TITLE,
            TWITTERRULEFORM_EDIT_TITLE,
            TWITTERRULEFORM_CREATE_BUTTON,
            TWITTERRULEFORM_EDIT_BUTTON,
            TWITTERRULEFORM_CANCEL_BUTTON,
            TWITTERRULEFORM_DELETE_BUTTON,
            TWITTERRULEFORM_NAME,
            TWITTERRULEFORM_ACTION,
            TWITTERRULEFORM_MESSAGES,
            TWITTERRULEFORM_CONDITION,
            TWITTERRULEFORM_KEYWORDS,
            TWITTERRULEFORM_LANGUAGES,
            TWITTERRULEFORM_DELAY,
            TWITTERRULEFORM_LANG_TOOLTIP
        } = this.props.lang;
        const buttonSubmit = this.props.loading ? <LoadingCog/> : <SuccessButton id="buttonSubmit" onClick={this.handleClick}>{this.props.edit ? TWITTERRULEFORM_EDIT_BUTTON : TWITTERRULEFORM_CREATE_BUTTON}</SuccessButton>;
        const buttonDelete = this.props.delete && !this.props.loading && <DangerButton id="buttonDeleteMode" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERRULEFORM_DELETE_BUTTON}</DangerButton>;
        const buttonCancel = this.props.cancel && !this.props.loading && <SecondaryButton id="buttonCancel" onClick={this.handleClick}>{TWITTERRULEFORM_CANCEL_BUTTON}</SecondaryButton>;
        const messages = this.props.messages && <Messages messages={this.props.messages}/>;
        const deleteMode = this.state.deleteMode ? this.props.loading ? <LoadingCog /> : <div className="col-sm-12"><DangerButton id="buttonDeleteYes" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERRULEFORM_DELETE_BUTTON}</DangerButton>
            <SecondaryButton id="buttonDeleteNo" onClick={this.handleClick}>{TWITTERRULEFORM_CANCEL_BUTTON}</SecondaryButton></div> 
            : <div className="col-sm-12">{buttonSubmit}<div style={{ float: "right" }}>{buttonDelete}{buttonCancel}</div></div>;
        return (
            <Form title={this.props.title ? this.props.edit ? TWITTERRULEFORM_EDIT_TITLE : TWITTERRULEFORM_CREATE_TITLE : null}>
                {messages}
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERRULEFORM_NAME}</label>
                    <div className="col-sm-10">
                        <Input className="form-control" name="name" value={this.state.name} onChange={this.handleChange} autoFocus/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERRULEFORM_ACTION}</label>
                    <div className="col-sm-10">
                        <ListInput name="type" options={Object.keys(TwitterRuleTypes)} onChange={this.handleChange} defaultOption={this.state.type}/>
                    </div>
                </div>
                {
                    TwitterRuleTypes[this.state.type] === TwitterRuleTypes.TWEET && (
                        <div className="form-group">
                            <label className="col-sm-2">{TWITTERRULEFORM_MESSAGES}</label>
                            <div className="col-sm-10">
                                <ArrayInput name="messages" onChange={this.handleChange} values={this.state.messages} unique />
                            </div>
                        </div>
                    )
                }
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERRULEFORM_CONDITION}</label>
                    <div className="col-sm-10">
                        <Switch name="condition" options={Object.keys(TwitterRuleConditions)} onChange={this.handleChange} defaultOption={this.state.condition} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERRULEFORM_KEYWORDS}</label>
                    <div className="col-sm-10">
                        <ArrayInput name="track" onChange={this.handleChange} values={this.state.track} unique />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-2">
                        <label>{TWITTERRULEFORM_LANGUAGES}</label>
                        <span style={{ float: "right" }}>
                            <ToolTip>
                                {TWITTERRULEFORM_LANG_TOOLTIP}
                            </ToolTip>
                        </span>
                    </div>
                    <div className="col-sm-10">
                        <ArrayInput name="lang" options={Object.keys(TwitterRuleLangs)} onChange={this.handleChange} values={this.state.lang} unique />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">{TWITTERRULEFORM_DELAY}</label>
                    <div className="col-sm-10">
                        <NumberInput name="delay" onChange={this.handleChange} value={parseInt(this.state.delay)} />
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

export default withLanguage(TwitterRuleForm);