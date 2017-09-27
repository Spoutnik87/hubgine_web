import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AccountSettings from "./AccountSettings";

class UserSettings extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {

        };
    }

    render()
    {
        return (
            <div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        lang: state.lang,
        user: state.user,
        campaigns: state.campaigns
    };
};

export default connect(mapStateToProps)(UserSettings);