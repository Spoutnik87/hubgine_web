import React, { Component } from "react";
import PropTypes from "prop-types";
import { withMessages } from "./withMessages";
import UserSubscriptionChart from "./UserSubscriptionChart";
import Container from "./Container";
import Card from "./Card";
import Row from "./Row";

class Home extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired
    };

    render()
    {
        const data = [
            {index: '01/05', value: 10},
            {index: '02/05', value: 15},
            {index: '03/05', value: 25},
            {index: '04/05', value: 50},
            {index: '05/05', value: 60},
            {index: '06/05', value: 72},
            {index: '07/05', value: 84},
        ];
        return (
            <Container fluid>
                <Row>
                    <div className="col-sm-4">
                        <Card>
                            <UserSubscriptionChart data={data} />
                            <h3>Heading</h3>
                            <p>
                                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                                mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                                mollis euismod. Donec sed odio dui.
                            </p>
                            <a href="#" role="button" className="btn btn-secondary">View details</a>
                        </Card>
                    </div>
                    <div className="col-sm-4">
                        <Card>
                            <h3>Heading</h3>
                            <p>
                                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                                mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                                mollis euismod. Donec sed odio dui.
                            </p>
                            <a href="#" role="button" className="btn btn-secondary">View details</a>
                        </Card>
                    </div>
                    <div className="col-sm-4">
                        <Card>
                            <h3>Heading</h3>
                            <p>
                                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                                mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                                mollis euismod. Donec sed odio dui.
                            </p>
                            <a href="#" role="button" className="btn btn-secondary">View details</a>
                        </Card>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default withMessages(Home);