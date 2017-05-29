import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AccountOverview extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        lang: PropTypes.shape({
            
        }).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    componentDidMount() {
        
    }

    render()
    {
        return (
            <div className="panel-body">
                <div className="col-md-4 col-sm-6" style={ { height: "200px" } }>
                    Name : {this.props.account.name} <br/>
                    Daily quota : 25/150 <br/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(AccountOverview);