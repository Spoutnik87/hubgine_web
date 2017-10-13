import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "../Container";
import Panel from "../Panel";

class AdminDashboard extends Component {
    constructor(props)
    {
        super(props);
    }
    
    render()
    {
        return (
            <Container>
                <Panel title="Reset password">

                </Panel>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        accounts: state.accounts,
        campaigns: state.campaigns
    };
};

export default connect(mapStateToProps)(AdminDashboard);