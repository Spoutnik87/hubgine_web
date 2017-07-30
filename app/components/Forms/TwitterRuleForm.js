import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Messages from "../Messages";
import ArrayInput from "../Inputs/ArrayInput";
import ListInput from "../Inputs/ListInput";
import NumberInput from "../Inputs/NumberInput";
import Switch from "../Inputs/Switch";

class TwitterRuleForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            TWITTERRULEFORM_CREATE_TITLE: PropTypes.string.isRequired,
            TWITTERRULEFORM_CREATE_BUTTON: PropTypes.string.isRequired,
            TWITTERRULEFORM_EDIT_BUTTON: PropTypes.string.isRequired,
            TWITTERRULEFORM_CANCEL_BUTTON: PropTypes.string.isRequired,
            TWITTERRULEFORM_DELETE_BUTTON: PropTypes.string.isRequired,
            TWITTERRULEFORM_ACTION: PropTypes.string.isRequired,
            TWITTERRULEFORM_CONDITION: PropTypes.string.isRequired,
            TWITTERRULEFORM_KEYWORDS: PropTypes.string.isRequired,
            TWITTERRULEFORM_LANGUAGES: PropTypes.string.isRequired,
            TWITTERRULEFORM_DELAY: PropTypes.string.isRequired
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
        rule: PropTypes.shape({
            action: PropTypes.string.isRequired,
            condition: PropTypes.string.isRequired,
            keywords: PropTypes.array.isRequired,
            languages: PropTypes.array.isRequired,
            delay: PropTypes.string.isRequired
        })
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
        messages: undefined,
        rule: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = this.props.rule ? {
            action: this.props.rule.action,
            condition: this.props.rule.condition,
            keywords: this.props.rule.keywords,
            languages: this.props.rule.languages,
            delay: this.props.rule.delay,
            deleteMode: false
        } : {
            action: "",
            condition: "",
            keywords: [],
            languages: [],
            delay: "",
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
                action: this.state.action,
                condition: this.state.condition,
                keywords: this.state.keywords,
                languages: this.state.languages,
                delay: this.state.delay
            }
        };
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
            TWITTERRULEFORM_CREATE_BUTTON,
            TWITTERRULEFORM_EDIT_BUTTON,
            TWITTERRULEFORM_CANCEL_BUTTON,
            TWITTERRULEFORM_DELETE_BUTTON,
            TWITTERRULEFORM_ACTION,
            TWITTERRULEFORM_CONDITION,
            TWITTERRULEFORM_KEYWORDS,
            TWITTERRULEFORM_LANGUAGES,
            TWITTERRULEFORM_DELAY
        } = this.props.lang;
        const buttonSubmit = this.props.loading ? <LoadingCog/> : this.props.edit ? <button id="buttonSubmit" className="btn btn-primary" onClick={this.handleClick}>{TWITTERRULEFORM_EDIT_BUTTON}</button> : <button id="buttonSubmit" className="btn btn-success" onClick={this.handleClick}>{TWITTERRULEFORM_CREATE_BUTTON}</button>;
        const buttonDelete = this.props.delete && !this.props.loading ? <button id="buttonDeleteMode" className="btn btn-danger" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERRULEFORM_DELETE_BUTTON}</button> : undefined;
        const buttonCancel = this.props.cancel && !this.props.loading ? <button id="buttonCancel" className="btn btn-default" onClick={this.handleClick}>{TWITTERRULEFORM_CANCEL_BUTTON}</button> : undefined;
        const title = this.props.title ? <div className="panel-heading"><h3 className="panel-title">{TWITTERRULEFORM_CREATE_TITLE}</h3></div> : undefined;
        const messages = this.props.messages ? <Messages messages={this.props.messages}/> : undefined;
        const deleteMode = this.state.deleteMode ? <div className="col-sm-12"><button id="buttonDeleteYes" className="btn btn-danger" onClick={this.handleClick} style={{ marginRight: "20px" }}>{TWITTERRULEFORM_DELETE_BUTTON}</button>
            <button id="buttonDeleteNo" className="btn btn-default" onClick={this.handleClick}>{TWITTERRULEFORM_CANCEL_BUTTON}</button></div> 
            : <div className="col-sm-12">{buttonSubmit}<div style={{ float: "right" }}>{buttonDelete}{buttonCancel}</div></div>;
        return (
            <div>
                {title}
                <div className="panel-body form-horizontal">
                    {messages}
                    <div className="form-group">
                        <label className="col-sm-2">{TWITTERRULEFORM_ACTION}</label>
                        <div className="col-sm-10">
                            <ListInput name="action" options={["Tweet", "Retweet", "Like"]} onChange={this.handleChange} defaultOption={this.state.action}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2">{TWITTERRULEFORM_CONDITION}</label>
                        <div className="col-sm-10">
                            <Switch name="condition" options={["AND", "OR"]} onChange={this.handleChange} defaultOption={this.state.condition} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2">{TWITTERRULEFORM_KEYWORDS}</label>
                        <div className="col-sm-10">
                            <ArrayInput name="keywords" onChange={this.handleChange} values={this.state.keywords} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2">{TWITTERRULEFORM_LANGUAGES}</label>
                        <div className="col-sm-10">
                            <ArrayInput name="languages" options={["en", "fr"]} onChange={this.handleChange} values={this.state.languages} />
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(TwitterRuleForm);