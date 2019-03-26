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

    shouldComponentUpdate(nextProps, nextState)
    {
        return false;
    }

    render()
    {
        const {
            loadCallback,
            verifyCallback,
            expiredCallback
        } = this.props;
        return (
            <RecaptchaModule sitekey={config.key} onloadCallback={loadCallback} verifyCallback={verifyCallback} expiredCallback={expiredCallback} render="explicit"/>
        );
    }
}

export default Recaptcha;