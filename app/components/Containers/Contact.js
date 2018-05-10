import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { contact } from "../../actions/contact";
import ContactForm from "../Forms/ContactForm";
import { withMessages } from "../withMessages";
import Container from "../Container";
import Card from "../Card";
import Messages from "../Messages";

class Contact extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            displayContactForm: true,
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        const {
            reason,
            email,
            message,
            recaptcha
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.contact(reason, email, message, recaptcha).then(() => {
            this.setState({
                displayContactForm: false
            });
        }).catch(() => {
            this.setState({
                loading: false
            });
        });
    }
    
    render()
    {
        const {
            messages
        } = this.props;
        const {
            displayContactForm,
            loading
        } = this.state;
        return (
            <Container>
            {
                displayContactForm ? (
                    <ContactForm onSubmit={this.handleSubmit} loading={loading} messages={messages} clientSide={true}/>
                ) : (
                    <Card>
                        <Messages messages={messages}/>
                    </Card>
                )
            }
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            contact
        }, dispatch)
    };
};

export default withMessages(connect(undefined, mapDispatchToProps)(Contact));