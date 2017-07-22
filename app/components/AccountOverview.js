import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListInput from "./Inputs/ListInput";
import NumberInput from "./Inputs/NumberInput";
import ArrayInput from "./Inputs/ArrayInput";
import DateInput from "./Inputs/DateInput";
import Switch from "./Inputs/Switch";
import Checkbox from "./Inputs/Checkbox";
import { isValidTwitterRuleKeyword } from "validator";

class AccountOverview extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        lang: PropTypes.shape({
            
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    componentDidMount()
    {
        
    }

    render()
    {
        return (
            <div className="panel-body">
                <Checkbox name="ch" value={true} onChange={() => {}} />
                <Switch name="sw" values={["AND", "OR", "XOR"]} defaultOption="OR" onChange={() => {}} />
                <DateInput name="date" onChange={() => {}} />
                <ArrayInput name="array" onChange={() => {}} condition={isValidTwitterRuleKeyword} limit={5} unique />
                <NumberInput name="num" value={1} onChange={() => {}} />
                <ListInput name="test" options={[ { key: "qf", value: "a" }, { key: "qda", value: "b" }]} defaultIndex={1} onChange={() => {}} customKeys />
                <div className="col-md-4 col-sm-6" style={ { height: "200px" } }>
                    Name : {this.props.account.name} <br/>
                    Daily quota : 25/150 <br/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountOverview);