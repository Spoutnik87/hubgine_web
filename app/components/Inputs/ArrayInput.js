import React, { Component } from "react";
import PropTypes from "prop-types";
import ListInput from "./ListInput";

class ArrayInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        options: PropTypes.array,
        defaultIndex: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        condition: PropTypes.func,
        limit: PropTypes.number,
        unique: PropTypes.bool
    };

    static defaultProps = {
        defaultIndex: 0,
        limit: 0,
        unique: false
    };

    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.options ? this.props.options[this.props.defaultIndex] : "",
            values: [],
            selectedElement: "input"
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
        if (event.target.id === "buttonAdd")
        {
            const value = this.state.value;
            if (((this.props.condition && this.props.condition(value)) || (!this.props.condition && value.match("^.+$"))) && ((this.props.unique && !this.state.values.includes(value)) || !this.props.unique))
            {
                const values = [...this.state.values, value];
                this.setState({
                    values: values
                });
                this.props.onChange({
                    name: this.props.name,
                    values: values
                });
            }
        }
        else if (event.target.id === "buttonRemove")
        {
            const values = this.state.values.filter((value, index) => {
                return this.state.selectedElement !== index.toString();
            });
            this.setState({
                values: values,
                selectedElement: "input"
            });
            this.props.onChange({
                name: this.props.name,
                values: values
            });
        }
        else
        {
            let element;
            if (element = event.target.getAttribute("data-element"))
            {
                if (this.state.selectedElement !== element)
                {
                    this.setState({
                        selectedElement: element
                    });
                }
                else if (this.state.selectedElement !== "input")
                {
                    this.setState({
                        selectedElement: "input"
                    });
                }
            }
            else if (event.target.name === "list" && this.state.selectedElement !== "input")
            {
                this.setState({
                    selectedElement: "input"
                });
            }
        }
    }

    render()
    {
        const button = this.state.selectedElement === "input" ? <button id="buttonAdd" type="button" className="btn btn-success col-md-2 col-sm-3 col-xs-4" onClick={this.handleClick} disabled={this.props.limit > 0 ? this.state.values.length >= this.props.limit : false}><i className="fa fa-plus"></i> Post</button> 
            : <button id="buttonRemove" type="button" className="btn btn-danger col-md-2 col-sm-3 col-xs-4" onClick={this.handleClick}><i className="fa fa-minus"></i> Remove</button>;
        return (
            <div className="input-group" style={{ width: "100%" }}>
                <div className="array-input-display">{this.state.values.map((value, index) => {
                    return <div key={index} data-element={index} className={this.state.selectedElement === index.toString() ? "array-input-display-element no-select array-input-display-element-selected" : "array-input-display-element no-select"
                    } onClick={this.handleClick}>{value}<br/></div>; })}</div>
                <div className="col-md-10 col-sm-9 col-xs-8" style={{ paddingLeft: 0 }}>
                    {
                        this.props.options ? 
                            <ListInput name="list" options={this.props.options} defaultIndex={this.props.defaultIndex} onClick={this.handleClick} onChange={this.handleChange} />
                            : <input type="text" data-element="input" className="form-control" value={this.state.value} onClick={this.handleClick} onChange={this.handleChange} autoFocus/>
                    }
                </div>
                {button}
            </div>
        );
    }
}

export default ArrayInput;