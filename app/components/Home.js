import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserSubscriptionChart from "./UserSubscriptionChart";

class Home extends Component {
  constructor(props)
  {
    super(props);
  }

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <UserSubscriptionChart data={data} />
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

Home.propTypes = {
  lang: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
