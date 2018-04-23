import React, { Component } from "react";
import PropTypes from "prop-types";
import NavItem from "./NavItem";

class Nav extends Component {
    static propTypes = {
        name: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        }).isRequired).isRequired,
        pills: PropTypes.bool,
        vertical: PropTypes.bool,
        activeItem: PropTypes.any.isRequired,
        onChange: PropTypes.func
    };

    static defaultProps = {
        name: "nav",
        pills: false,
        vertical: false,
        onChange: () => {}
    };

    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {
        const {
            name,
            onChange
        } = this.props;
        onChange({
            name: name,
            value: event.target.getAttribute("data-element")
        });
    }

    render()
    {
        const {
            items,
            pills,
            vertical,
            activeItem
        } = this.props;
        return (
            <ul className={"nav" + (pills ? " nav-pills" : "") + (vertical ? " flex-column" : "")}>
            {
                items.map((item, index) => (
                    <NavItem key={index} data-element={item.value} onClick={this.handleClick} active={item.value === activeItem}>{item.name}</NavItem>
                ))
            }
            </ul>
        );
    };
}

export default Nav;