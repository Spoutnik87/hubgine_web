import React, { Component } from "react";
import PropTypes from "prop-types";
import { withProps } from "./withProps";
import * as Props from "../constants/Props";

class Footer extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            FOOTER_TITLE: PropTypes.string.isRequired
        }).isRequired
    };

    shouldComponentUpdate(nextProps, nextState)
    {
        const {
            lang
        } = this.props;
        return nextProps.lang !== lang;
    }

    render()
    {
        const {
            FOOTER_TITLE
        } = this.props.lang;
        return (
            <footer>
                <span>{FOOTER_TITLE}</span>
            </footer>
        );
    }
}

export default withProps(Footer, [ Props.LANG ]);