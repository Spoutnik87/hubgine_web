import React from 'react';
import { sendFailureMessage, sendSuccessMessage } from '../actions/profile';
import Messages from './Messages';
import validator from 'validator';

class AutoInputText extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            editText: false,
            last_text: "",
            name: this.props.name,
            text: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick(event)
    {
        if (event.target.id == "buttonTextEdit")
        {
            this.setState({ last_text: this.state.text, editText: true });
        }

        if (event.target.id == "buttonTextCancel")
        {
            this.setState({ text: this.state.last_text, editText: false });
        }

        if (event.target.id == "buttonTextValidate")
        {
            this.setState({ editText: false });
            this.props.onValidate({ name: this.state.name, value: this.state.text });
            /*if (!validator.isEmpty(this.state.text))
            {
                this.setState({ editText: !this.state.editText });
                const messages = [{ msg: "You edited your text successfully." }];
                this.props.dispatch(sendSuccessMessage(messages));
            }
            else
            {
                const messages = [{ msg: "Text is not valid." }];
                this.props.dispatch(sendFailureMessage(messages));
            }*/
        }
    }
    
    render()
    {
        const divText = !this.state.editText ? 
            <div className="input-group">
                <div className="form-control">{this.state.text}</div>
                <span id="buttonTextEdit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextEdit" className="fa fa-pencil fa-fw"></i></span>
            </div>
            : 
            <div className="input-group">
                <input type="text" name="text" id="text" className="form-control" value={this.state.text} onChange={this.handleChange} autoFocus/>
                <span id="buttonTextValidate" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextValidate" className="fa fa-check fa-fw"></i></span>
                <span id="buttonTextCancel" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextCancel" className="fa fa-remove fa-fw"></i></span>
            </div>;
        
        return (divText);
    }
}

export default AutoInputText;