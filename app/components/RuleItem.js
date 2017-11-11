import React, { Component } from "react";
import PropTypes from "prop-types";
import { invert } from "lodash";
import * as TwitterRuleTypes from "../constants/TwitterRuleTypes";
import * as TwitterRuleConditions from "../constants/TwitterRuleConditions";
import * as TwitterRuleLangs from "../constants/TwitterRuleLangs";
import PrimaryButton from "./buttons/PrimaryButton";

class RuleItem extends Component {
    static propTypes = {
        accountId: PropTypes.string.isRequired,
        campaignId: PropTypes.string.isRequired,
        rule: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.number.isRequired,
            track: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            condition: PropTypes.string.isRequired,
            delay: PropTypes.number.isRequired,
            undo: PropTypes.number.isRequired,
            lang: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
        }).isRequired,
        onEditMode: PropTypes.func
    };

    static defaultProps = {
        onEditMode: () => {},
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
            name,
            type,
            track,
            condition,
            delay,
            undo,
            lang
        } = this.props.rule;
        return (
            <div id={name} className="ruleitem col-md-12">
                <div style={{ float: "right" }} onClick={this.handleClick}>
                    <PrimaryButton onClick={this.handleEditMode}>Edit this rule</PrimaryButton>
                </div>
                Name : {name}<br/>
                Type : {invert(TwitterRuleTypes)[type]}<br/>
                Track : {track.map((elem,index) => (
                    <div key={index}>
                        {elem}
                    </div>
                ))}
                Condition : {invert(TwitterRuleConditions)[condition]}<br/>
                Delay : {delay}<br/>
                Lang : {lang.map((elem, index) => (
                    <div key={index}>
                        {invert(TwitterRuleLangs)[elem]}
                    </div>
                ))}
            </div>
        )
    }
}

export default RuleItem;