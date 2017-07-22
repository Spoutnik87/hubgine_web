import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NumberInput from "./Inputs/NumberInput";

class AccountSettings extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        lang: PropTypes.shape({
            
        }).isRequired
    };

    render()
    {
        return (
            <div className="panel-body">
                <NumberInput name="delay" value={0} onSubmit={() => {}} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountSettings);