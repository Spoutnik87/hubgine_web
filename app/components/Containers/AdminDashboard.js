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
                <Panel title="Admin Dashboard">

                </Panel>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        accounts: state.accounts
    };
};

export default connect(mapStateToProps)(AdminDashboard);