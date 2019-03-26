import React, { Component } from "react";
import PropTypes from "prop-types";
import FormGroup from "./FormGroup";
import Row from "./Row";
import Tooltip from "./Tooltip";

class Text extends Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        id: PropTypes.string,
        label: PropTypes.string,
        tooltip: PropTypes.string,
    };

    static defaultProps = {
        name: "text",
        value: ""
    };

    render()
    {
        const {
            id,
            label,
            tooltip,
            value,
            ...props
        } = this.props;
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
                        {value}
                    </div>    
                </Row>
            </FormGroup>
        ) : (
            value
        );
    }
}

export default Text;