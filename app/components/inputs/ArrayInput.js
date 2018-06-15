import React, { Component } from "react";
import PropTypes from "prop-types";
import v4 from "uuid/v4";
import { findIndex } from "lodash";
import { withProps } from "../withProps";
import * as Props from "../../constants/Props";
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
        values: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.any),
            PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        }))]),
        options: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.any),
            PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        }))]),
        defaultOption: PropTypes.any,
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
        const {
            options: optionsProps,
            values,
            defaultOption
        } = this.props;
        const options = optionsProps && optionsProps.filter(option => findIndex(values, { value: (option.value != null ? option.value : option) }) === -1)
            .map(option => ({
                name: option.name != null ? option.name : option,
                value: option.value != null ? option.value : option
            }));
        this.state = {
            options: options,
            value: optionsProps ? (defaultOption || (options.length > 0 ? (options[0].value != null ? options[0].value : options[0]) : undefined)) : "",
            values: values.map(element => {
                let name;
                if (optionsProps != null)
                {
                    const optionsPropsIndex = findIndex(optionsProps, { value: (element.value != null ? element.value : element) });
                    name = optionsProps[optionsPropsIndex].name || optionsProps[optionsPropsIndex];
                }
                else
                {
                    name = element.name || element;
                }
                return {
                    key: v4(),
                    name: name,
                    value: element.value != null ? element.value : element
                };
            }),
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
                condition,
                unique,
                options: optionsProps
            } = this.props;
            const {
                value,
                values,
                options
            } = this.state;
            if (((condition && condition(value)) || (!condition && value.match("^.+$"))) && ((unique && !values.map(elem => elem.value).includes(value)) || !unique))
            {
                const state = {
                    values: [
                        ...values,
                        {
                            key: v4(),
                            name: optionsProps != null ? optionsProps.filter(option => (option.value === value))[0].name : value,
                            value: value
                        }
                    ]
                };
                if (!options)
                {
                    state.value = "";
                }
                else
                {
                    state.options = options.filter(option => option.value !== value);
                    state.value = state.options.length > 0 ? state.options[0].value : "";
                }
                this.setState(state);
                this.props.onChange({
                    name: this.props.name,
                    values: state.values.map(elem => elem.value)
                });
            }
        }
        else if (event.target.id === "buttonRemove")
        {
            const {
                name,
                options: optionsProps
            } = this.props;
            const {
                selectedElement,
                options
            } = this.state;
            const values = this.state.values.filter(elem => {
                return selectedElement !== elem.value;
            });
            const state = {
                values: values,
                selectedElement: undefined,
                options: options
            };
            if (options && !options.includes(selectedElement))
            {
                state.options.push({
                    name: optionsProps.filter(option => (option.value === selectedElement))[0].name,
                    value: selectedElement
                });
                state.value = state.options[0].value;
            }
            this.setState(state);
            this.props.onChange({
                name: name,
                values: values.map(elem => elem.value)
            });
        }
        else
        {
            let element;
            if (element = event.target.getAttribute("data-element"))
            {
                const {
                    selectedElement
                } = this.state;
                if (selectedElement !== element && element !== "input")
                {
                    this.setState({
                        selectedElement: element
                    });
                }
                else if (selectedElement != null)
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
        const {
            limit,
            id,
            label,
            tooltip
        } = this.props;
        const {
            selectedElement,
            value,
            values,
            defaultOption,
            options
        } = this.state;
        const arrayInput = (
            <InputGroup syle={{ width: "100%" }}>
                <div className="arrayinput-display">
                {
                    values.map(element => (
                        <div key={element.key} data-element={element.value} className={selectedElement === element.value ? "arrayinput-display-element no-select arrayinput-display-element-selected" : "arrayinput-display-element no-select"} 
                            onClick={this.handleClick}>{element.name}<br/></div>
                        )
                    )
                }
                </div>
                <div className="col-xs-12 col-sm-12 col-md-8" style={{ padding: "0" }}>
                {
                    options ? (
                        <ListInput name="list" options={options} defaultOption={defaultOption} onClick={this.handleClick} onChange={this.handleChange}/>
                    ) : (
                        <Input data-element="input" value={value} onClick={this.handleClick} onChange={this.handleChange}/>
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

export default withProps(ArrayInput, [ Props.LANG ]);