import React, { Component } from "react";
import PropTypes from "prop-types";
import RecaptchaModule from "react-recaptcha";
import { recaptcha as config } from "../../client-config.json";

class Recaptcha extends Component {
    static propTypes = {
        loadCallback: PropTypes.func,
        verifyCallback: PropTypes.func,
        expiredCallback: PropTypes.func
    };

    static defaultProps = {
        loadCallback: () => {},
        verifyCallback: () => {},
        expiredCallback: () => {}
    };

    render()
    {
        return (
            <RecaptchaModule sitekey={config.key} onloadCallback={this.props.loadCallback} verifyCallback={this.props.verifyCallback} expiredCallback={this.props.expiredCallback} render="explicit" />
        );
    }
}

export default Recaptcha;