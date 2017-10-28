import React, { Component } from "react";
import PropTypes from "prop-types";
import Panel from "./Panel";

class RulesOverview extends Component {
    static propTypes = {
        campaign: PropTypes.shape({
            name: PropTypes.string.isRequired,
            dateBegin: PropTypes.string.isRequired,
            dateEnd: PropTypes.string.isRequired,
            config: PropTypes.shape({
                messagesFollow: PropTypes.object.isRequired,
                undoFollow: PropTypes.number.isRequired,
                maxTweetsFollow: PropTypes.number.isRequired,
                delayFollowersUpdate: PropTypes.number.isRequired,
                rules: PropTypes.array.isRequired
            }).isRequired
        }).isRequired
    };

    static defaultProps = {

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