import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import LoadingCog from "../LoadingCog";
import ArrayInput from "../inputs/ArrayInput";
import ListInput from "../inputs/ListInput";
import NumberInput from "../inputs/NumberInput";
import Switch from "../inputs/Switch";
import Input from "../inputs/Input";
import Messages from "../Messages";
import Form from "../Form";
import SuccessButton from "../buttons/SuccessButton";
import DangerButton from "../buttons/DangerButton";
import SecondaryButton from "../buttons/SecondaryButton";
import * as TwitterRuleType from "../../constants/TwitterRuleType";
import * as TwitterRuleCondition from "../../constants/TwitterRuleCondition";
import * as TwitterRuleLang from "../../constants/TwitterRuleLang";
import FormGroup from "../FormGroup";

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
            TWITTERRULEFORM_LANG_TOOLTIP: PropTypes.string.isRequired,
            TWITTERRULEFORM_DELAY_TOOLTIP: PropTypes.string.isRequired,
            TWITTERRULEFORM_AND_SWITCH: PropTypes.string.isRequired,
            TWITTERRULEFORM_OR_SWITCH: PropTypes.string.isRequired,
            TWITTERRULEFORM_TWEET_SWITCH: PropTypes.string.isRequired,
            TWITTERRULEFORM_RETWEET_SWITCH: PropTypes.string.isRequired,
            TWITTERRULEFORM_FAVORITE_SWITCH: PropTypes.string.isRequired
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
            type: this.props.rule.type,
            messages: this.props.rule.messages,
            condition: this.props.rule.condition,
            track: this.props.rule.track,
            lang: this.props.rule.lang,
            delay: this.props.rule.delay,
            deleteMode: false
        } : {
            name: "",
            type: TwitterRuleType.TWEET,
            messages: [],
            condition: TwitterRuleCondition.AND,
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
                type: this.state.type,
                messages: this.state.type === TwitterRuleType.TWEET ? this.state.messages : undefined,
                track: this.state.track,
                condition: this.state.condition,
                delay: this.state.delay,
                lang: this.state.lang
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
            [event.name]: event.value != null ? event.value : event.values
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
            TWITTERRULEFORM_LANG_TOOLTIP,
            TWITTERRULEFORM_DELAY_TOOLTIP,
            TWITTERRULEFORM_AND_SWITCH,
            TWITTERRULEFORM_OR_SWITCH,
            TWITTERRULEFORM_TWEET_SWITCH,
            TWITTERRULEFORM_RETWEET_SWITCH,
            TWITTERRULEFORM_FAVORITE_SWITCH
        } = this.props.lang;
        const {
            title,
            edit,
            children,
            loading,
            cancel,
            messages,
            delete: hasDeleteButton
        } = this.props;
        const {
            deleteMode,
            name,
            type,
            condition,
            track,
            lang,
            delay,
            messages: ruleMessages
        } = this.state;
        const switchOptions = [
            {
                name: TWITTERRULEFORM_AND_SWITCH,
                value: TwitterRuleCondition.AND
            },
            {
                name: TWITTERRULEFORM_OR_SWITCH,
                value: TwitterRuleCondition.OR
            }
        ];
        const ruleTypes = [
            {
                name: TWITTERRULEFORM_TWEET_SWITCH,
                value: TwitterRuleType.TWEET
            },
            {
                name: TWITTERRULEFORM_RETWEET_SWITCH,
                value: TwitterRuleType.RETWEET
            },
            {
                name: TWITTERRULEFORM_FAVORITE_SWITCH,
                value: TwitterRuleType.FAVORITE
            }
        ];
        return (
            <Form title={title ? edit ? TWITTERRULEFORM_EDIT_TITLE : TWITTERRULEFORM_CREATE_TITLE : undefined}>
                {
                    messages && <Messages messages={messages}/>
                }
                <Input id="name" name="name" value={name} label={TWITTERRULEFORM_NAME} onChange={this.handleChange} autoFocus/>
                <ListInput id="type" name="type" options={ruleTypes} label={TWITTERRULEFORM_ACTION} onChange={this.handleChange} defaultOption={type}/>
                {
                    type === TwitterRuleType.TWEET && (
                        <ArrayInput id="messages" name="messages" values={ruleMessages} label={TWITTERRULEFORM_MESSAGES} onChange={this.handleChange} unique/>
                    )
                }
                <Switch id="condition" name="condition" options={switchOptions} label={TWITTERRULEFORM_CONDITION} onChange={this.handleChange} defaultOption={condition}/>
                <ArrayInput id="track" name="track" label={TWITTERRULEFORM_KEYWORDS} values={track} onChange={this.handleChange} unique/>
                <ArrayInput id="lang" name="lang" options={Object.keys(TwitterRuleLang).map(lang => ({ name: lang, value: TwitterRuleLang[lang] }))} values={lang.map(l => ({ name: l, value: l }))} label={TWITTERRULEFORM_LANGUAGES} tooltip={TWITTERRULEFORM_LANG_TOOLTIP} onChange={this.handleChange} unique/>
                <NumberInput id="delay" name="delay" label={TWITTERRULEFORM_DELAY} value={parseInt(delay)} tooltip={TWITTERRULEFORM_DELAY_TOOLTIP} onChange={this.handleChange}/>
                <FormGroup>
                {
                    deleteMode ? (
                        loading ? (
                            <LoadingCog/>
                        ) : (
                            <Fragment>
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <DangerButton id="buttonDeleteYes" className="form-button"  onClick={this.handleClick}>{TWITTERRULEFORM_DELETE_BUTTON}</DangerButton>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <SecondaryButton id="buttonDeleteNo" className="form-button" onClick={this.handleClick}>{TWITTERRULEFORM_CANCEL_BUTTON}</SecondaryButton>
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
                                        <SuccessButton id="buttonSubmit" className="form-button" onClick={this.handleClick}>{edit ? TWITTERRULEFORM_EDIT_BUTTON : TWITTERRULEFORM_CREATE_BUTTON}</SuccessButton>
                                    </div>
                                    {
                                        hasDeleteButton && (
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <DangerButton id="buttonDeleteMode" className="form-button" onClick={this.handleClick}>{TWITTERRULEFORM_DELETE_BUTTON}</DangerButton>
                                            </div>
                                        )
                                    }
                                    {
                                        cancel && (
                                            <div className="col-xs-12 col-sm-12 col-md-12">
                                                <SecondaryButton id="buttonCancel" className="form-button" onClick={this.handleClick}>{TWITTERRULEFORM_CANCEL_BUTTON}</SecondaryButton>
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

export default withLanguage(TwitterRuleForm);