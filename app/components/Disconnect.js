import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { disconnect } from "../actions/user";

class Disconnect extends Component {
  componentWillMount()
  {
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