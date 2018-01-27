import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { disconnect } from "../actions/user";
import * as Ranks from "../constants/Ranks";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Signin from "./Containers/Signin";
import Register from "./Containers/Register";
import ForgotPassword from "./Containers/ForgotPassword";
import UserDashboard from "./Containers/UserDashboard";
import AdminDashboard from "./Containers/AdminDashboard";
import AccountOverview from "./Containers/AccountOverview";
import CampaignOverview from "./Containers/CampaignOverview";
import Profile from "./Containers/Profile";
import NotFound from "./NotFound";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";
import LoggedInRoute from "./routes/LoggedInRoute";
import AdminRoute from "./routes/AdminRoute";

class App extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }

    handleDisconnect()
    {
        this.props.actions.disconnect();
    }

    render()
    {
        const isLoggedIn = this.props.user.token !== undefined;
        const isAdmin = this.props.user.rank === Ranks.ADMIN;
        return (
            <div>
                <Header user={this.props.user} onDisconnect={this.handleDisconnect}/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <LoggedInRoute path="/user-dashboard" component={UserDashboard} isLoggedIn={isLoggedIn}/>
                    <LoggedInRoute path="/account/:accountId" component={AccountOverview} isLoggedIn={isLoggedIn}/>
                    <LoggedInRoute path="/campaign/:accountId/:campaignId" component={CampaignOverview} isLoggedIn={isLoggedIn}/>
                    <LoggedInRoute path="/profile" component={Profile} isLoggedIn={isLoggedIn}/>
                    <AdminRoute path="/admin-dashboard" component={AdminDashboard} isAdmin={isAdmin}/>
                    <NotLoggedInRoute path="/signin" component={Signin} isNotLoggedIn={!isLoggedIn}/>
                    <NotLoggedInRoute path="/register" component={Register} isNotLoggedIn={!isLoggedIn}/>
                    <NotLoggedInRoute path="/forgot-password" component={ForgotPassword} isNotLoggedIn={!isLoggedIn}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            disconnect
        }, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
  