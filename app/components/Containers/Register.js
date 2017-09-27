import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { register } from "../../actions/user";
import { clearMessages } from "../../actions/messages";
import { ENGLISH } from "../../constants/Languages";
import UserRegisterForm from "../Forms/UserRegisterForm";
import LoadingCog from "../LoadingCog";

class Register extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        const { email, password, cpassword, firstname, lastname, useterms, recaptcha } = event.result;

        this.setState({
            loading: true
        });
        this.props.actions.register(email, password, cpassword, firstname, lastname, ENGLISH, useterms, recaptcha).catch(error => {
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
            <div className="container">
                <div className="panel">
                    <UserRegisterForm onSubmit={this.handleSubmit} loading={this.state.loading} messages={this.props.messages} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            clearMessages,
            register
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
