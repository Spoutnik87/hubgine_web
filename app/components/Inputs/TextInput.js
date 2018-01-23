import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import LoadingCog from "../LoadingCog";
import IconButton from "../buttons/IconButton";

class TextInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        loading: PropTypes.bool,
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        name: "textinput",
        value: "",
        loading: false,
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
            value: event.value
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
        if (this.props.loading)
        {
            mainDiv = <LoadingCog />
        }
        else
        {
            if (this.state.isEditMode)
            {
                mainDiv = (
                    <div className="input-group">
                        <Input className="form-control" value={this.state.value} onChange={this.handleChange} autoFocus />
                        <IconButton id="buttonTextSubmit" className="input-group-append input-group-text edit-button" icon="fas fa-check" onClick={this.handleClick} />
                        <IconButton id="buttonTextCancel" className="input-group-append input-group-text edit-button" icon="fas fa-times" onClick={this.handleClick} />        
                    </div>
                );
            }
            else
            {
                mainDiv = (
                    <div className="input-group">
                        <div className="form-control">{this.props.value}</div>
                        <IconButton id="buttonTextEdit" className="input-group-append input-group-text edit-button" icon="fas fa-pencil-alt" onClick={this.handleClick} />        
                    </div>
                );
            }
        }
        return mainDiv;
    }
}

export default TextInput;