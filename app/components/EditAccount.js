import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EditAccount extends Component {
    static propTypes = {

    };

    constructor(props)
    {
        super(props);
    }

    componentDidMount() {
        
    }
    
    componentWillUnmount() {
        
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default withRouter(connect(mapStateToProps)(EditAccount));