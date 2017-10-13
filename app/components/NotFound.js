import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import { withLanguage } from "./withLanguage";

class NotFound extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            NOTFOUND_TITLE: PropTypes.string.isRequired
        }).isRequired
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.lang !== this.props.lang;
    }

    render()
    {
        const {
            NOTFOUND_TITLE
        } = this.props.lang;
        return (
            <Container center>
                <h1>404</h1>
                <p>{NOTFOUND_TITLE}</p>
            </Container>
        );
    }
}

export default withLanguage(NotFound);