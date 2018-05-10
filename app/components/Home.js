import React, { Component } from "react";
import PropTypes from "prop-types";
import { withMessages } from "./withMessages";
import Container from "./Container";
import Card from "./Card";
import Row from "./Row";

class Home extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired
    };

    render()
    {
        return (
            <Container>
                <Card>
                    <h3>Heading</h3>
                    <p>
                        Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                        mollis euismod. Donec sed odio dui.
                    </p>
                    <a href="#" role="button" className="btn btn-secondary">View details</a>
                </Card>
            </Container>
        );
    }
}

export default withMessages(Home);