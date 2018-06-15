import React, { Component } from "react";
import PropTypes from "prop-types";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
import Container from "../Container";
import Card from "../Card";
import TwitterAccountForm from "../forms/TwitterAccountForm";

class EditAccount extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            EDITACCOUNT_TITLE: PropTypes.string.isRequired
        }).isRequired
    };

    

    render()
    {
        const {
            EDITACCOUNT_TITLE
        } = this.props.lang;

        return (
            <Container>
                <Card title={EDITACCOUNT_TITLE}>
                    <TwitterAccountForm/>
                </Card>
            </Container>
        );
    }
}

export default withProps(EditAccount, [ Props.LANG ]);