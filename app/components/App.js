import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { disconnect } from "../actions/user";
import * as Rank from "../constants/Rank";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Signin from "./containers/Signin";
import Register from "./containers/Register";
import ForgotPassword from "./containers/ForgotPassword";
import UserDashboard from "./containers/UserDashboard";
import AdminDashboard from "./containers/AdminDashboard";
import AccountOverview from "./containers/AccountOverview";
import CampaignOverview from "./containers/CampaignOverview";
import Profile from "./containers/Profile";
import Contact from "./containers/Contact";
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
        const {
            user
        } = this.props;
        const isLoggedIn = user.token !== undefined;
        const isAdmin = user.rank === Rank.ADMIN;
        return (
            <Fragment>
                <Header user={user} onDisconnect={this.handleDisconnect}/>
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
                    <Route path="/contact" component={Contact}/>
                    <Route component={NotFound}/>
                </Switch>
                <Footer/>
            </Fragment>
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