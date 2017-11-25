import React, { Component } from "react";
import PropTypes from "prop-types";
import { withLanguage } from "../withLanguage";
import ListInput from "./ListInput";
import v4 from "uuid";

class ArrayInput extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            ARRAYINPUT_ADD_BUTTON: PropTypes.string.isRequired,
            ARRAYINPUT_DELETE_BUTTON: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string,
        values: PropTypes.array,
        options: PropTypes.array,
        defaultOption: PropTypes.string,
        onChange: PropTypes.func,
        condition: PropTypes.func,
        limit: PropTypes.number,
        unique: PropTypes.bool
    };

    static defaultProps = {
        name: "arrayinput",
        values: [],
        options: undefined,
        defaultOption: undefined,
        onChange: () => {},
        condition: undefined,
        limit: 0,
        unique: false,
    };

    constructor(props)
    {
        super(props);
        const options = this.props.options && this.props.options.filter(option => !this.props.values.includes(option));
        this.state = {
            options: options,
            value: this.props.options ? this.props.defaultOption || options[0] : "",
            values: this.props.values.map(element => ({
                key: v4(),
                value: element
            })),
            selectedElement: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            value: event.value || event.target.value
        });
    }

    handleClick(event)
    {
        if (event.target.id === "buttonAdd")
        {
            const {
                value
            } = this.state;
            if (((this.props.condition && this.props.condition(value)) || (!this.props.condition && value.match("^.+$"))) && ((this.props.unique && !this.state.values.map(elem => elem.value).includes(value)) || !this.props.unique))
            {
                const values = [...this.state.values, {
                    key: v4(),
                    value: value
                }];
                const state = {
                    values: values
                };
                if (!this.state.options)
                {
                    state.value = "";
                }
                else
                {
                    state.options = this.state.options.filter(option => option !== value);
                    state.value = state.options.length > 0 ? state.options[0] : "";
                }
                this.setState(state);
                this.props.onChange({
                    name: this.props.name,
                    values: values.map(elem => elem.value)
                });
            }
        }
        else if (event.target.id === "buttonRemove")
        {
            const values = this.state.values.filter((value, index) => {
                return this.state.selectedElement !== index.toString();
            });
            const state = {
                values: values,
                selectedElement: null,
                options: this.state.options
            };
            if (this.state.options && !this.state.options.includes(this.state.values[this.state.selectedElement].value))
            {
                state.options.push(this.state.values[this.state.selectedElement].value);
                state.value = state.options[0];
            }
            this.setState(state);
            this.props.onChange({
                name: this.props.name,
                values: values.map(elem => elem.value)
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
                else if (this.state.selectedElement !== null)
                {
                    this.setState({
                        selectedElement: null
                    });
                }
            }
            else if (event.target.name === "list" && this.state.selectedElement !== null)
            {
                this.setState({
                    selectedElement: null
                });
            }
        }
    }

    render()
    {
        const { ARRAYINPUT_ADD_BUTTON, ARRAYINPUT_DELETE_BUTTON } = this.props.lang;
        const button = this.state.selectedElement === null ? <button id="buttonAdd" type="button" className="btn btn-success col-md-2 col-sm-3 col-xs-4" onClick={this.handleClick} disabled={this.props.limit > 0 ? this.state.values.length >= this.props.limit : false}><i id="buttonAdd" className="fa fa-plus" onClick={this.handleClick}></i> {ARRAYINPUT_ADD_BUTTON}</button> 
            : <button id="buttonRemove" type="button" className="btn btn-danger col-md-2 col-sm-3 col-xs-4" onClick={this.handleClick}><i id="buttonRemove" className="fa fa-minus" onClick={this.handleClick}></i> {ARRAYINPUT_DELETE_BUTTON}</button>;
        return (
            <div className="input-group" style={{ width: "100%" }}>
                <div className="array-input-display">
                {
                    this.state.values.map((element, index) => (
                        <div key={element.key} data-element={index} className={this.state.selectedElement === index.toString() ? "array-input-display-element no-select array-input-display-element-selected" : "array-input-display-element no-select"} 
                            onClick={this.handleClick}>{element.value}<br/></div>
                        )
                    )
                }
                </div>
                <div className="col-md-10 col-sm-9 col-xs-8" style={{ paddingLeft: 0 }}>
                    {
                        this.props.options ? (
                            <ListInput name="list" options={this.state.options} defaultOption={this.props.defaultOption} onClick={this.handleClick} onChange={this.handleChange} />
                        ) : (
                            <input type="text" data-element="input" className="form-control" value={this.state.value} onClick={this.handleClick} onChange={this.handleChange} autoFocus/>
                        )
                    }
                </div>
                {button}
            </div>
        );
    }
}

export default withLanguage(ArrayInput);