import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoadingCog from "../LoadingCog";
import Messages from "../Messages";

class UserSigninForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            SIGNIN_TITLE: PropTypes.string.isRequired,
            SIGNIN_EMAIL: PropTypes.string.isRequired,
            SIGNIN_PASSWORD: PropTypes.string.isRequired,
            SIGNIN_SUBMIT: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        onSubmit: PropTypes.func,
        title: PropTypes.bool,
        loading: PropTypes.bool,
        messages: PropTypes.object
    };

    static defaultProps = {
        name: "signin",
        onSubmit: () => {},
        title: true,
        loading: false,
        messages: undefined
    };

    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event)
    {
        this.props.onSubmit({
            name: this.props.name,
            result: {
                email: this.state.email,
                password: this.state.password
            }
        });
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render()
    {
        const { SIGNIN_TITLE, SIGNIN_EMAIL, SIGNIN_PASSWORD, SIGNIN_SUBMIT } = this.props.lang;
        const buttonSubmit = this.props.loading ? <LoadingCog/> : <button type="submit" className="btn btn-success" onClick={this.handleClick}>{SIGNIN_SUBMIT}</button>;
        const title = this.props.title ? <div className="panel-heading"><h3 className="panel-title">{SIGNIN_TITLE}</h3></div> : undefined;
        const messages = this.props.messages ? <Messages messages={this.props.messages}/> : undefined;
        return (
            <div>
                {title}
                <div className="panel-body form-horizontal">
                    {messages}
                    <div className="form-group">
                        <label htmlFor="email" className="col-sm-2">{SIGNIN_EMAIL}</label>
                        <div className="col-sm-8">
                            <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange} autoFocus/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2">{SIGNIN_PASSWORD}</label>
                        <div className="col-sm-8">
                            <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange} autoFocus/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-8">
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

export default connect(mapStateToProps)(UserSigninForm);