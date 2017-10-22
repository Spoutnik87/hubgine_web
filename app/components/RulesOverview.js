import React, { Component } from "react";
import PropTypes from "prop-types";
import Panel from "./Panel";

class RulesOverview extends Component {
    static propTypes = {
        campaign: PropTypes.shape({
            accountId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            dateBegin: PropTypes.string.isRequired,
            dateEnd: PropTypes.string.isRequired,
            config: PropTypes.shape({
                messages_follow: PropTypes.object.isRequired,
                undo_follow: PropTypes.number.isRequired,
                max_tweets_follow: PropTypes.number.isRequired,
                delay_followers_update: PropTypes.number.isRequired,
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