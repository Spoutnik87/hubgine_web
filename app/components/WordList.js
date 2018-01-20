import React, { Component } from "react";
import PropTypes from "prop-types";
import v4 from "uuid/v4";

class WordList extends Component {
    static propTypes = {
        words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            words: this.props.words.map(word => ({
                key: v4(),
                value: word
            }))
        }
    }

    render()
    {
        const { words } = this.state;
        return (
            <div>
            {
                words.map((word, index) => (
                    <div key={word.key} className="col-xs-6 col-sm-4 col-md-3 col-lg-2">{index+1}. {word.value}</div>
                ))
            }
            </div>
        );
    }
}

export default WordList;