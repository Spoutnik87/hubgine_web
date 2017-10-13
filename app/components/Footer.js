import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";

class Footer extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            FOOTER_TITLE: PropTypes.string.isRequired
        }).isRequired
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        if (nextProps.lang !== this.props.lang)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    render()
    {
        const {
            FOOTER_TITLE
        } = this.props.lang;
        return (
            <footer>
                <p>{FOOTER_TITLE}</p>
            </footer>
        );
    }
}

export default withLanguage(Footer);