import React, { Component } from "react";
import PropTypes from "prop-types";
import { withData } from "../withData";
import * as Data from "../../constants/Data";
import Container from "../Container";
import Card from "../Card";

class Useterms extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            USETERMS_TITLE: PropTypes.string.isRequired,
            USETERMS_CONTENT: PropTypes.string.isRequired
        }).isRequired
    };

    render()
    {
        const {
            USETERMS_TITLE,
            USETERMS_CONTENT
        } = this.props.lang
        return (
            <Container>
                <Card>
                    <h3>{USETERMS_TITLE}</h3>
                    <p>{USETERMS_CONTENT}</p>
                </Card>
            </Container>
        );
    }
}

export default withData(Useterms, [ Data.LANG ]);