import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";
import RuleItem from "./RuleItem";
import LoadingCog from "./LoadingCog";
import TwitterRuleForm from "./Forms/TwitterRuleForm";

class RuleList extends Component {
    static propTypes = {
        accountId: PropTypes.string.isRequired,
        campaignId: PropTypes.string.isRequired,
        rules: PropTypes.arrayOf(PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.number.isRequired,
            track: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            condition: PropTypes.string.isRequired,
            delay: PropTypes.number.isRequired,
            undo: PropTypes.number.isRequired,
            lang: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
        }).isRequired).isRequired,
        selectedRule: PropTypes.string,
        loading: PropTypes.bool,
        onRuleEditMode: PropTypes.func,
        onRuleEditionSubmit: PropTypes.func,
        onRuleEditionDelete: PropTypes.func,
        onRuleEditionCancel: PropTypes.func
    };

    static defaultProps = {
        selectedRule: "",
        loading: false,
        onRuleEditMode: () => {},
        onRuleEditionSubmit: () => {},
        onRuleEditionDelete: () => {},
        onRuleEditionCancel: () => {}
    };

    render()
    {
        const {
            selectedRule,
            loading
        } = this.props;
        return (
            this.props.rules.length > 0 ? (
                <div>
                    {
                        this.props.rules.map(rule => (
                            <div key={rule.uid}>
                            {
                                rule.name === selectedRule ? (
                                    loading ? (
                                        <LoadingCog center />
                                    ) : (
                                        <TwitterRuleForm edit cancel delete rule={rule} onSubmit={this.props.onRuleEditionSubmit} onDelete={this.props.onRuleEditionDelete} onCancel={this.props.onRuleEditionCancel} />
                                    )
                                ) : (
                                    <RuleItem accountId={this.props.accountId} campaignId={this.props.campaignId} rule={rule} onEditMode={this.props.onRuleEditMode} />
                                )
                            }
                            </div>
                        ))
                    }
                </div>
            ) : (
                <div>There is no rule yet.</div>
            )
        );
    }
}

export default withLanguage(RuleList);