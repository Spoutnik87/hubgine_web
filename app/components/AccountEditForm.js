import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import AutoInputText from './AutoInputText';
import { updateAccount } from '../util/api';
import { updateAccountName, updateAccountConsumerKey, updateAccountConsumerSecret, updateAccountAccessToken, updateAccountAccessTokenKey } from '../actions/accounts';

class AccountEditForm extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            onEditMode: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.onValidate = this.onValidate.bind(this);
    }

    handleClick(event)
    {
        this.setState({ onEditMode: !this.state.onEditMode });
    }

    onValidate(input)
    {
        if (input.name === "name")
        {
            if (!validator.isEmpty(input.value) && input.value !== this.props.account.name)
            {
                updateAccount(this.props.user.email, this.props.user.token, "name", input.value, (error, result) => {
                    if (!error)
                    {
                        this.props.dispatch(updateAccountName(0, input.value));
                    }
                    else
                    {

                    }
                });
            }
        }
    }

    render() {
        return (
            this.state.onEditMode ?
            <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.account.name}</h3>
                    <hr/>
                </div>
                <div className="panel-body">
                    <AutoInputText name="name" value="" onValidate={this.onValidate} />
                </div>
            </div>
            :
            <div className="input-group">
                <div className="form-control">{this.props.account.name}</div>
                <span id="buttonEditMode" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonEditMode" className="fa fa-pencil fa-fw"></i></span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
    lang: state.lang,
  };
};

export default connect(mapStateToProps)(AccountEditForm);