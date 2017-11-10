import React, { Component } from "react";
import PropTypes from "prop-types";
import Panel from "./Panel";

class TwitterRulesPreview extends Component {
    static propTypes = {
        rules: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.number.isRequired,
            track: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            condition: PropTypes.string.isRequired,
            undo: PropTypes.number.isRequired,
            lang: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
        })).isRequired
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
            <Panel title="Rules">

            </Panel>
        );
    }
}

export default RulesOverview;