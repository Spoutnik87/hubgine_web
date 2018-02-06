import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";
import RuleItem from "./RuleItem";
import LoadingCog from "./LoadingCog";
import TwitterRuleForm from "./Forms/TwitterRuleForm";

class RuleList extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            RULELIST_NO_RULES: PropTypes.string.isRequired
        }).isRequired,
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
        selectedRule: undefined,
        loading: false,
        onRuleEditMode: () => {},
        onRuleEditionSubmit: () => {},
        onRuleEditionDelete: () => {},
        onRuleEditionCancel: () => {}
    };

    render()
    {
        const {
            RULELIST_NO_RULES
        } = this.props.lang;
        const {
            rules,
            accountId,
            campaignId,
            selectedRule,
            loading,
            onRuleEditMode,
            onRuleEditionCancel,
            onRuleEditionDelete,
            onRuleEditionSubmit
        } = this.props;
        return (
            rules.length > 0 ? (
                <div>
                {
                    rules.map(rule => (
                        <div key={rule.uid}>
                        {
                            <RuleItem accountId={accountId} campaignId={campaignId} rule={rule} onEditMode={onRuleEditMode} 
                                edit={rule.name === selectedRule} loading={rule.name === selectedRule && loading} onRuleEditionSubmit={onRuleEditionSubmit} 
                                    onRuleEditionDelete={onRuleEditionDelete} onRuleEditionCancel={onRuleEditionCancel}/>
                        }
                        </div>
                    ))
                }
                </div>
            ) : (
                <div>{RULELIST_NO_RULES}</div>
            )
        );
    }
}

export default withLanguage(RuleList);