import React, { Component } from "react";
import PropTypes from "prop-types";
import v4 from "uuid/v4";
import { withLanguage } from "../withLanguage";
import Input from "./Input";
import ListInput from "./ListInput";
import SuccessButton from "../buttons/SuccessButton";
import DangerButton from "../buttons/DangerButton";
import FormGroup from "../FormGroup";
import Row from "../Row";
import InputGroup from "../InputGroup";
import Tooltip from "../Tooltip";

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
        id: PropTypes.string,
        label: PropTypes.string,
        tooltip: PropTypes.string,
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
            selectedElement: undefined
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
                selectedElement: undefined,
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
                if (this.state.selectedElement !== element && element !== "input")
                {
                    this.setState({
                        selectedElement: element
                    });
                }
                else if (this.state.selectedElement != null)
                {
                    this.setState({
                        selectedElement: undefined
                    });
                }
            }
            else if (event.target.name === "list" && this.state.selectedElement != null)
            {
                this.setState({
                    selectedElement: undefined
                });
            }
        }
    }

    render()
    {
        const {
            ARRAYINPUT_ADD_BUTTON,
            ARRAYINPUT_DELETE_BUTTON
        } = this.props.lang;
        const { limit, id, label, tooltip } = this.props;
        const { selectedElement, value, values, defaultOption, options } = this.state;
        const arrayInput = (
            <InputGroup syle={{ width: "100%" }}>
                <div className="arrayinput-display">
                {
                    values.map((element, index) => (
                        <div key={element.key} data-element={index} className={selectedElement === index.toString() ? "arrayinput-display-element no-select arrayinput-display-element-selected" : "arrayinput-display-element no-select"} 
                            onClick={this.handleClick}>{element.value}<br/></div>
                        )
                    )
                }
                </div>
                <div className="col-xs-12 col-sm-12 col-md-8" style={{ padding: "0" }}>
                    {
                        options ? (
                            <ListInput name="list" options={options} defaultOption={defaultOption} onClick={this.handleClick} onChange={this.handleChange} />
                        ) : (
                            <Input data-element="input" value={value} onClick={this.handleClick} onChange={this.handleChange} />
                        )
                    }
                </div>
                {
                    selectedElement == null ? (
                        <SuccessButton id="buttonAdd" className="col-xs-12 col-sm-12 offset-md-1 col-md-3" onClick={this.handleClick} disabled={limit > 0 ? values.length >= limit : false}><i id="buttonAdd" className="fa fa-plus"></i> {ARRAYINPUT_ADD_BUTTON}</SuccessButton>
                    ) : (
                        <DangerButton id="buttonRemove" className="col-xs-12 col-sm-12 offset-md-1 col-md-3" onClick={this.handleClick}><i id="buttonRemove" className="fa fa-minus"></i> {ARRAYINPUT_DELETE_BUTTON}</DangerButton>
                    )
                }
            </InputGroup>
        );
        return label ? (
            <FormGroup>
                <Row>
                    <label htmlFor={id} className="col-xs-12 col-sm-3 col-md-2">
                        {label}
                        {
                            tooltip && (
                                <span className="right-align">
                                    <Tooltip>
                                        {tooltip}
                                    </Tooltip>
                                </span>
                            )
                        }
                    </label>
                    <div className="col-xs-12 col-sm-9 col-md-10">
                        {arrayInput}
                    </div>
                </Row>
            </FormGroup>
        ) : (
            arrayInput
        );
    }
}

export default withLanguage(ArrayInput);