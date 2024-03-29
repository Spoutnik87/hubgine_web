import React, { Component } from "react";
import PropTypes from "prop-types";
import { invert } from "lodash";
import { withProps } from "./withProps";
import * as Props from "../constants/Props";
import * as TwitterRuleType from "../constants/TwitterRuleType";
import * as TwitterRuleCondition from "../constants/TwitterRuleCondition";
import * as TwitterRuleLang from "../constants/TwitterRuleLang";
import PrimaryButton from "./buttons/PrimaryButton";
import TwitterRuleForm from "./forms/TwitterRuleForm";
import LoadingCog from "./LoadingCog";

class RuleItem extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            RULEITEM_EDIT_BUTTON: PropTypes.string.isRequired
        }).isRequired,
        accountId: PropTypes.string.isRequired,
        campaignId: PropTypes.string.isRequired,
        rule: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.number.isRequired,
            messages: PropTypes.arrayOf(PropTypes.string.isRequired),
            track: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            condition: PropTypes.string.isRequired,
            delay: PropTypes.number.isRequired,
            undo: PropTypes.number.isRequired,
            lang: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
        }).isRequired,
        onEditMode: PropTypes.func,
        edit: PropTypes.bool,
        loading: PropTypes.bool,
        onRuleEditionSubmit: PropTypes.func,
        onRuleEditionDelete: PropTypes.func,
        onRuleEditionCancel: PropTypes.func
    };

    static defaultProps = {
        onEditMode: () => {},
        edit: false,
        loading: false,
        onRuleEditionSubmit: () => {},
        onRuleEditionDelete: () => {},
        onRuleEditionCancel: () => {}
    };

    constructor(props)
    {
        super(props);
        this.handleEditMode = this.handleEditMode.bind(this);
    }

    handleEditMode(event)
    {
        this.props.onEditMode({
            name: this.props.rule.name
        });
    }

    render()
    {
        const {
            RULEITEM_EDIT_BUTTON
        } = this.props.lang;
        const {
            name,
            type,
            track,
            condition,
            delay,
            undo,
            lang
        } = this.props.rule;
        const { edit, loading } = this.props;
        return (
            <div id={name} className="col-md-12">
            {
                edit ? (
                    loading ? (
                        <LoadingCog center/>
                    ) : (
                        <TwitterRuleForm edit cancel delete rule={this.props.rule} onSubmit={this.props.onRuleEditionSubmit} onDelete={this.props.onRuleEditionDelete} onCancel={this.props.onRuleEditionCancel}/>
                    )
                ) : (
                    <div>
                        <div className="right-align" onClick={this.handleClick}>
                            <PrimaryButton onClick={this.handleEditMode}>{RULEITEM_EDIT_BUTTON}</PrimaryButton>
                        </div>
                        Name : {name}<br/>
                        Type : {invert(TwitterRuleType)[type]}<br/>
                        Track : {track.map((elem,index) => (
                            <div key={index}>
                                {elem}
                            </div>
                        ))}
                        Condition : {invert(TwitterRuleCondition)[condition]}<br/>
                        Delay : {delay}<br/>
                        Lang : {lang.map((elem, index) => (
                            <div key={index}>
                                {invert(TwitterRuleLang)[elem]}
                            </div>
                        ))}
                    </div>
                )
            }
            </div>
        )
    }
}

export default withProps(RuleItem, [ Props.LANG ]);