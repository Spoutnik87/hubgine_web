import React from 'react';
const botAPI = require('../util/api');

class UserDashboard extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { email: "" };
        this.api = new botAPI();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
    }

    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    render()
    {
        return (
            <div className="container-fluid">
                <div className="row">
                <div className="col-sm-4">
                    <div className="panel">
                    <div className="panel-body">
                        <h3>Heading</h3>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                        mollis euismod. Donec sed odio dui.</p>
                        <a href="#" role="button" className="btn btn-default">View details</a>
                    </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="panel">
                    <div className="panel-body">
                        <h3>Heading</h3>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                        mollis euismod. Donec sed odio dui.</p>
                        <a href="#" role="button" className="btn btn-default">View details</a>
                    </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="panel">
                    <div className="panel-body">
                        <h3>Heading</h3>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                        mollis euismod. Donec sed odio dui.</p>
                        <a href="#" role="button" className="btn btn-default">View details</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default UserDashboard;