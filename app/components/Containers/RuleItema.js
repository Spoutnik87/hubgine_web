import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { invert } from "lodash";
import { updateTwitterRule, removeTwitterRule } from "../../actions/accounts";
import { withLanguage } from "../withLanguage";
import * as TwitterRuleTypes from "../../constants/TwitterRuleTypes";
import * as TwitterRuleConditions from "../../constants/TwitterRuleConditions";
import * as TwitterRuleLangs from "../../constants/TwitterRuleLangs";
import PrimaryButton from "../buttons/PrimaryButton";
import TwitterRuleForm from "../Forms/TwitterRuleForm";
import LoadingCog from "../LoadingCog";

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
        onClick: PropTypes.func
    };

    static defaultProps = {
        onClick: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            loading: false,
            edit: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleRuleEditionSubmit = this.handleRuleEditionSubmit.bind(this);
        this.handleRuleEditionDelete = this.handleRuleEditionDelete.bind(this);
        this.handleRuleEditionCancel = this.handleRuleEditionCancel.bind(this);
    }

    handleClick(event)
    {
        this.setState({
            edit: true
        });
    }

    handleRuleEditionSubmit(event)
    {
        const {
            accountId,
            campaignId
        } = this.props;
        const {
            name: ruleId
        } = this.props.rule;
        const {
            name,
            type,
            track,
            condition,
            delay,
            lang
        } = event.result;
        this.setState({
            loading: true
        });
        this.props.actions.updateTwitterRule(accountId, campaignId, ruleId, name, type, track, condition, delay, null, lang).then(() => {
            this.setState({
                loading: false,
                edit: false
            });
        }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleRuleEditionDelete()
    {
        const {
            accountId,
            campaignId,
            name
        } = this.props.rule;
        this.setState({
            loading: true
        });
        this.props.actions.removeTwitterRule(accountId, campaignId, name).catch(() => {
            this.setState({
                loading: false
            });
        });
    }

    handleRuleEditionCancel()
    {
        this.setState({
            edit: false
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
        return this.state.loading ? (
            <LoadingCog center/>
        ) : (
            this.state.edit ? (
                <TwitterRuleForm edit cancel delete rule={this.props.rule} onSubmit={this.handleRuleEditionSubmit} onDelete={this.handleRuleEditionDelete} onCancel={this.handleRuleEditionCancel} />
            ) : (
                <div id={name} className="ruleitem col-md-12">
                    <div style={{ float: "right" }} onClick={this.handleClick}>
                        <PrimaryButton onClick={this.handleClick}>Edit this rule</PrimaryButton>
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
                            {elem}
                        </div>
                    ))}
                </div>
            )
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            updateTwitterRule, removeTwitterRule
        }, dispatch)
    };
};

export default withLanguage(connect(null, mapDispatchToProps)(RuleItem));