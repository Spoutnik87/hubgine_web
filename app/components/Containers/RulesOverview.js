import React, { Component } from "react";
import PropTypes from "prop-types";
import LoadingCog from "../LoadingCog";
import Panel from "../Panel";
import RuleList from "../RuleList";
import SuccessButton from "../buttons/SuccessButton";
import TwitterRuleForm from "../Forms/TwitterRuleForm";

class RulesOverview extends Component {
    static propTypes = {
        accountId: PropTypes.string.isRequired,
        campaign: PropTypes.shape({
            name: PropTypes.string.isRequired,
            dateBegin: PropTypes.string.isRequired,
            dateEnd: PropTypes.string.isRequired,
            config: PropTypes.shape({
                messagesFollow: PropTypes.object.isRequired,
                undoFollow: PropTypes.number.isRequired,
                maxTweetsFollow: PropTypes.number.isRequired,
                delayFollowersUpdate: PropTypes.number.isRequired,
                rules: PropTypes.arrayOf(PropTypes.shape({
                    uid: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    type: PropTypes.number.isRequired,
                    track: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
                    condition: PropTypes.string.isRequired,
                    delay: PropTypes.number.isRequired,
                    undo: PropTypes.number.isRequired,
                    lang: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
                })).isRequired
            }).isRequired
        }).isRequired,
        onRuleCreationSubmit: PropTypes.func,
        onRuleCreationCancel: PropTypes.func
    };

    static defaultProps = {
        onRuleCreationSubmit: () => {},
        onRuleCreationCancel: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loading: false,
            creationFormDisplayed: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleRuleCreationSubmit = this.handleRuleCreationSubmit.bind(this);
        this.handleRuleCreationCancel = this.handleRuleCreationCancel.bind(this);
    }

    handleClick(event)
    {
        this.setState({
            creationFormDisplayed: true
        });
    }

    render()
    {
        console.log("g");
        console.log(this.props.campaign);
        console.log("v");
        return (
            <div>
                <Panel title="Rules">
                     {
                         this.state.creationFormDisplayed ? (
                            <TwitterRuleForm onSubmit={this.props.onRuleCreationSubmit} cancel onCancel={this.props.onRuleCreationCancel} loading={this.state.loading} />
                         ) : (
                            <RuleList accountId={this.props.accountId} campaignId={this.props.campaign.name} rules={this.props.campaign.config.rules} />
                         )
                     }
                </Panel>
                {
                    !this.state.creationFormDisplayed && (
                        <SuccessButton id="buttonSubmit" onClick={this.handleClick}>Add rule</SuccessButton>
                    )
                }
            </div>
        );
    }
}

export default RulesOverview;