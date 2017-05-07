import React, { Component } from "react";
import { disconnect } from "../actions/user";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

class Disconnect extends Component {
  componentWillMount() {
    this.props.dispatch(disconnect());
    this.props.cookies.remove("user");
    this.props.history.push("/");
  }

  render()
  {
    return null;
  }
}

export default withRouter(withCookies(connect()(Disconnect)));