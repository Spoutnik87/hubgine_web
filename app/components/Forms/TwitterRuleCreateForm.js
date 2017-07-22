import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArrayInput from "../Inputs/ArrayInput";
import ListInput from "../Inputs/ListInput";

class TwitterRuleCreateForm extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            
        }).isRequired
    };

    render()
    {
        return (
            <div className="panel">
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(TwitterRuleCreateForm);