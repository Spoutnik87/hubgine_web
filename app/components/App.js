import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as Ranks from "../constants/Ranks";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Signin from "./Signin";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import Disconnect from "./Disconnect";
import Profile from "./Profile";
import NotFound from "./NotFound";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";
import LoggedInRoute from "./routes/LoggedInRoute";
import AdminRoute from "./routes/AdminRoute";

class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render()
  {
    const isLoggedIn = this.props.user.token !== undefined;
    const isAdmin = this.props.user.rank === Ranks.ADMIN;
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <LoggedInRoute path="/user-dashboard" component={UserDashboard} isLoggedIn={isLoggedIn} />
          <LoggedInRoute path="/profile" component={Profile} isLoggedIn={isLoggedIn} />
          <LoggedInRoute path="/disconnect" component={Disconnect} isLoggedIn={isLoggedIn} />
          <AdminRoute path="/admin-dashboard" component={AdminDashboard} isAdmin={isAdmin} />
          <NotLoggedInRoute path="/signin" component={Signin} isNotLoggedIn={!isLoggedIn} />
          <NotLoggedInRoute path="/register" component={Register} isNotLoggedIn={!isLoggedIn} />
          <NotLoggedInRoute path="/forgot-password" component={ForgotPassword} isNotLoggedIn={!isLoggedIn} />
          <Route component={NotFound} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(App));