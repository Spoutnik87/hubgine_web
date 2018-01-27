import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import LoadingCog from "../LoadingCog";
import IconButton from "../buttons/IconButton";
import InputGroup from "../InputGroup";
import FormGroup from "../FormGroup";
import Row from "../Row";
import Tooltip from "../Tooltip";

class TextInput extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        loading: PropTypes.bool,
        id: PropTypes.string,
        label: PropTypes.string,
        tooltip: PropTypes.string,
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
        const { loading, id, label, tooltip } = this.props;
        const { isEditMode, value } = this.state;
        let textInput = loading ? (
            <LoadingCog />
        ) : (
            isEditMode ? (
                <InputGroup>
                    <Input value={value} onChange={this.handleChange} autoFocus />
                    <IconButton id="buttonTextSubmit" className="input-group-append input-group-text edit-button" icon="fas fa-check" onClick={this.handleClick} />
                    <IconButton id="buttonTextCancel" className="input-group-append input-group-text edit-button" icon="fas fa-times" onClick={this.handleClick} />        
                </InputGroup>
            ) : (
                <InputGroup>
                    <div className="form-control">{value}</div>
                    <IconButton id="buttonTextEdit" className="input-group-append input-group-text edit-button" icon="fas fa-pencil-alt" onClick={this.handleClick} />        
                </InputGroup>
            )
        )
        return label ? (
            <FormGroup>
                <Row>
                    <label htmlFor={id} className="col-xs-12 col-sm-3 col-md-2">
                        {label}
                        {
                            tooltip && (
                                <span style={{ float: "right" }}>
                                    <Tooltip>
                                        {tooltip}
                                    </Tooltip>
                                </span>
                            )
                        }
                    </label>
                    <div className="col-xs-12 col-sm-9 col-md-10">
                        {textInput}
                    </div>
                </Row>
            </FormGroup>
        ) : (
            textInput
        );
    }
}

export default TextInput;