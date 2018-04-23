import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as Heading from "../constants/Heading";

class Card extends Component {
    static propTypes = {
        title: PropTypes.any,
        rightTitle: PropTypes.any,
        heading: PropTypes.number,
        footer: PropTypes.any,
        children: PropTypes.any
    };

    static defaultProps = {
        title: undefined,
        rightTitle: undefined,
        heading: Heading.H3,
        footer: undefined,
        children: undefined
    };
    
    shouldComponentUpdate(nextProps, nextState)
    {
        const {
            title,
            rightTitle,
            heading,
            footer,
            children
        } = this.props;
        return nextProps.title !== title || nextProps.rightTitle !== rightTitle || nextProps.heading !== heading || nextProps.footer !== footer || nextProps.children !== children;
    }

    render()
    {
        const {
            title,
            rightTitle,
            heading,
            footer,
            children
        } = this.props;
        let cardTitle = undefined;
        if (title || rightTitle) {
            cardTitle = <Fragment>{title}{rightTitle && <span className="right-align">{rightTitle}</span>}</Fragment>;
            switch(heading) {
                case Heading.NONE:
                    cardTitle = <div className="card-title">{cardTitle}</div>
                    break;
                case Heading.H1:
                    cardTitle = <h1 className="card-title">{cardTitle}</h1>;
                    break;
                case Heading.H2:
                    cardTitle = <h2 className="card-title">{cardTitle}</h2>;
                    break;
                case Heading.H3:
                    cardTitle = <h3 className="card-title">{cardTitle}</h3>;
                    break;
                case Heading.H4:
                    cardTitle = <h4 className="card-title">{cardTitle}</h4>;
                    break;
                case Heading.H5:
                    cardTitle = <h5 className="card-title">{cardTitle}</h5>;
                    break;
                case Heading.H6:
                    cardTitle = <h6 className="card-title">{cardTitle}</h6>;
                    break;
                default:
                    cardTitle = <div className="card-title">{cardTitle}</div>
            }
        }
        return (
            <div className="card">
                {
                    (title || rightTitle) && (
                        <div className="card-header">{cardTitle}</div>
                    )
                }
                <div className="card-body">
                    {children}
                </div>
                {
                    footer && (
                        <div className="card-footer">{footer}</div>
                    )
                }
            </div>
        );
    }
}

export default Card;