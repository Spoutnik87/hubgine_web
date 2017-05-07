import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
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
import NotLoggedInRoute from "./NotLoggedInRoute";
import LoggedInRoute from "./LoggedInRoute";
import AdminRoute from "./AdminRoute";

class App extends Component {
  render()
  {
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <LoggedInRoute path="/user-dashboard" component={UserDashboard} />
          <LoggedInRoute path="/profile" component={Profile} />
          <LoggedInRoute path="/disconnect" component={Disconnect} />
          <AdminRoute path="/admin-dashboard" component={AdminDashboard} />
          <NotLoggedInRoute path="/signin" component={Signin} />
          <NotLoggedInRoute path="/register" component={Register} />
          <NotLoggedInRoute path="/forgot-password" component={ForgotPassword} />
          <Route component={NotFound} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;