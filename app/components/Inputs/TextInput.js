import React, { Component } from "react";
import PropTypes from "prop-types";

class TextInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        onSubmit: PropTypes.func
    };

    defaultProps = {
        name: "textinput",
        value: "",
        onSubmit: () => {}
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isEditMode: false,
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            value: event.target.value
        });
    }

    handleClick(event)
    {
        if (event.target.id === "buttonTextEdit")
        {
            this.setState({
                isEditMode: true,
                value: this.props.value
            });
        }
        else if (event.target.id === "buttonTextCancel")
        {
            this.setState({
                isEditMode: false
            });
        }
        else if (event.target.id === "buttonTextSubmit")
        {
            this.setState({
                isEditMode: false
            });
            this.props.onSubmit({
                name: this.props.name,
                value: this.state.value
            });
        }
    }

    render()
    {
        let mainDiv;
        if (this.state.isEditMode)
        {
            mainDiv = (
                <div className="input-group">
                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} autoFocus/>
                    <span id="buttonTextSubmit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextSubmit" className="fa fa-check fa-fw"></i></span>
                    <span id="buttonTextCancel" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextCancel" className="fa fa-remove fa-fw"></i></span>
                </div>
            );
        }
        else
        {
            mainDiv = (
                <div className="input-group">
                    <div className="form-control">{this.props.value}</div>
                    <span id="buttonTextEdit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextEdit" className="fa fa-pencil fa-fw"></i></span>
                </div>
            );
        }
        return mainDiv;
    }
}

export default TextInput;