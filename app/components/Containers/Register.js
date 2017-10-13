import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { register } from "../../actions/user";
import { ENGLISH } from "../../constants/Languages";
import { withMessages } from "../withMessages";
import UserRegisterForm from "../Forms/UserRegisterForm";
import Container from "../Container";
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

    render()
    {
        return (
            <Container>
                <UserRegisterForm onSubmit={this.handleSubmit} loading={this.state.loading} messages={this.props.messages} />
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            register
        }, dispatch)
    };
};

export default withMessages(connect(null, mapDispatchToProps)(Register));
