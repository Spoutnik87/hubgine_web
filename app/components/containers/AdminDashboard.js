import React, { Component } from "react";
import PropTypes from "prop-types";
import { withData } from "../withData";
import Container from "../Container";
import Card from "../Card";

class AdminDashboard extends Component {
    static propTypes = {
        lang: PropTypes.shape({
            ADMINDASHBOARD_TITLE: PropTypes.string.isRequired
        }).isRequired
    };
    
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

export default withData(AdminDashboard);