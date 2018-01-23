import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withMessages } from "../withMessages";
import { withLanguage } from "../withLanguage";
import Container from "../Container";
import Card from "../Card";

class AdminDashboard extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            ADMINDASHBOARD_TITLE: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props)
    {
        super(props);
    }
    
    render()
    {
        const {
            ADMINDASHBOARD_TITLE
        } = this.props.lang;
        return (
            <Container>
                <Card title={ADMINDASHBOARD_TITLE}>

                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts
    };
};

export default withMessages(withLanguage(connect(mapStateToProps)(AdminDashboard)));