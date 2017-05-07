import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AccountSettings extends Component {
    render()
    {
        return (
            <div className="panel-body">
                
            </div>
        );
    }
}

AccountSettings.propTypes = {
    account: PropTypes.shape({
        name: PropTypes.string
    }),
    lang: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountSettings);