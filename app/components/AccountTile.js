import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class AccountTile extends Component {
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {
        this.props.history.push(this.props.href);
    }

    render()
    {
        return (
            <div className="account-tile" onClick={this.handleClick}>
                <i className="fa fa-twitter fa-3x fa-fw"></i>
                <div className="account-tile-body">
                    Name : {this.props.account.name} <br/>
                    Status : <span className="account-active">Active</span>
                </div>
            </div>
        );
    }
}

AccountTile.propTypes = {
    account: PropTypes.shape({
        name: PropTypes.string
    }),
    lang: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        lang: state.lang
    };
};

export default withRouter(connect(mapStateToProps)(AccountTile));