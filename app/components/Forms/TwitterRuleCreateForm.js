import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Messages from "../Messages";
import ArrayInput from "../Inputs/ArrayInput";
import ListInput from "../Inputs/ListInput";
import NumberInput from "../Inputs/NumberInput";
import Switch from "../Inputs/Switch";

class TwitterRuleCreateForm extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onSubmit: PropTypes.func,
        lang: PropTypes.shape({
            
        }).isRequired
    };

    static defaultProps = {
        onSubmit: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            action: "",
            condition: "",
            keywords: [],
            languages: [],
            delay: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event)
    {
        this.props.onSubmit({
            name: this.props.name,
            result: {
                action: this.state.action,
                condition: this.state.condition,
                keywords: this.state.keywords,
                languages: this.state.languages,
                delay: this.state.delay
            }
        });
    }

    handleChange(event)
    {
        this.setState({
            [event.name]: event.value || event.values
        });
    }

    render()
    {
        const buttonSubmit = this.props.loading ? <LoadingCog/> : <button type="submit" className="btn btn-success" onClick={this.handleClick}>Submit</button>;
        const title = this.props.title ? <div className="panel-heading"><h3 className="panel-title">Create a twitter rule</h3></div> : undefined;
        const messages = this.props.messages ? <Messages messages={this.props.messages}/> : undefined
        return (
            <div>
                {title}
                <div className="panel-body form-horizontal">
                    {messages}
                    <div className="form-group">
                        <label className="col-sm-2">Action</label>
                        <div className="col-sm-10">
                            <ListInput name="action" options={["Tweet", "Retweet", "Like"]} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2">Condition</label>
                        <div className="col-sm-10">
                            <Switch name="condition" options={["AND", "OR"]} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2">Keywords</label>
                        <div className="col-sm-10">
                            <ArrayInput name="keywords" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2">Languages</label>
                        <div className="col-sm-10">
                            <ArrayInput name="languages" options={["en", "fr"]} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2">Delay</label>
                        <div className="col-sm-10">
                            <NumberInput name="delay" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            {buttonSubmit}
                        </div>
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

export default connect(mapStateToProps)(TwitterRuleCreateForm);