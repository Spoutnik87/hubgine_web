import React, { Component } from "react";
import PropTypes from "prop-types";
import { withData } from "./withData";
import * as Data from "../constants/Data";
import RuleItem from "./RuleItem";
import LoadingCog from "./LoadingCog";
import TwitterRuleForm from "./forms/TwitterRuleForm";

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
                <table className="table">
                    <tbody>
                    {
                        rules.map(rule => (
                            <tr key={rule.uid}>
                                <td>
                                {
                                    <RuleItem accountId={accountId} campaignId={campaignId} rule={rule} onEditMode={onRuleEditMode} 
                                        edit={rule.name === selectedRule} loading={rule.name === selectedRule && loading} onRuleEditionSubmit={onRuleEditionSubmit} 
                                            onRuleEditionDelete={onRuleEditionDelete} onRuleEditionCancel={onRuleEditionCancel}/>
                                }
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            ) : (
                RULELIST_NO_RULES
            )
        );
    }
}

export default withData(RuleList, [ Data.LANG ]);