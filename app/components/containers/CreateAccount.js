import React, { Component } from "react";
import PropTypes from "prop-types";
import { withData } from "../withData";
import * as Data from "../../constants/Data";
import Container from "../Container";
import Card from "../Card";
import TwitterAccountForm from "../forms/TwitterAccountForm";

class CreateAccount extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            CREATEACCOUNT_TITLE: PropTypes.string.isRequired
        }).isRequired
    };

    render()
    {
        const {
            CREATEACCOUNT_TITLE
        } = this.props.lang;
        
        return (
            <Container>
                <Card title={CreateAccount}>
                    <TwitterAccountForm/>
                </Card>
            </Container>
        );
    }
}

export default withData(CreateAccount, [ Data.LANG ]);