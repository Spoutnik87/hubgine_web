import React from 'react';

class AutoInputText extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            onEditMode: false,
            name: this.props.name,
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event)
    {
        this.setState({ value: event.target.value });
    }

    handleClick(event)
    {
        if (event.target.id === "buttonTextEdit")
        {
            this.setState({ value: this.props.value, onEditMode: true });
        }
        if (event.target.id === "buttonTextCancel")
        {
            this.setState({ onEditMode: false });
        }
        if (event.target.id === "buttonTextValidate")
        {
            this.setState({ onEditMode: false });
            this.props.onValidate({ name: this.state.name, value: this.state.value });
        }
    }
    
    render()
    {
        return !this.state.onEditMode ? 
            <div className="input-group">
                <div className="form-control">{this.props.value}</div>
                <span id="buttonTextEdit" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextEdit" className="fa fa-pencil fa-fw"></i></span>
            </div>
            : 
            <div className="input-group">
                <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} autoFocus/>
                <span id="buttonTextValidate" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextValidate" className="fa fa-check fa-fw"></i></span>
                <span id="buttonTextCancel" className="input-group-addon edit-button" onClick={this.handleClick}><i id="buttonTextCancel" className="fa fa-remove fa-fw"></i></span>
            </div>;
    }
}

export default AutoInputText;