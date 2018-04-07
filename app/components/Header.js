import React, { Component, Fragment } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withLanguage } from "./withLanguage";
import Container from "./Container";
import * as Ranks from "../constants/Ranks";

class Header extends Component {
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string,
            token: PropTypes.string,
            rank: PropTypes.oneOf(Object.values(Ranks))
          }).isRequired,
          lang: PropTypes.shape({
            COMPANY_NAME: PropTypes.string.isRequired,
            HEADER_HOME: PropTypes.string.isRequired,
            HEADER_ADMIN_DASHBOARD: PropTypes.string.isRequired,
            HEADER_USER_DASHBOARD: PropTypes.string.isRequired,
            HEADER_PROFILE: PropTypes.string.isRequired,
            HEADER_DISCONNECT: PropTypes.string.isRequired,
            HEADER_SIGNIN: PropTypes.string.isRequired,
            HEADER_REGISTER: PropTypes.string.isRequired,
            HEADER_CONTACT: PropTypes.string.isRequired
          }).isRequired,
          onDisconnect: PropTypes.func
    };

    static defaultProps = {
        onDisconnect: () => {}
    };

    render()
    {
        const isLoggedIn = this.props.user.token != null;
        const isAdmin = this.props.user.rank === Ranks.ADMIN;
        const {
            HEADER_ADMIN_DASHBOARD,
            HEADER_USER_DASHBOARD,
            HEADER_PROFILE,
            HEADER_DISCONNECT,
            HEADER_SIGNIN,
            HEADER_REGISTER,
            HEADER_CONTACT,
            COMPANY_NAME,
            HEADER_HOME
        } = this.props.lang;
        return (
            <Container>
                <nav className="navbar navbar-expand-md navbar-light">
                    <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggler collapsed">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/" className="navbar-brand">{COMPANY_NAME}</Link>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink className="nav-link" to="/" exact>{HEADER_HOME}</NavLink></li>
                            {
                                isAdmin && (
                                    <li className="nav-item"><NavLink className="nav-link" to="/admin-dashboard">{HEADER_ADMIN_DASHBOARD}</NavLink></li>
                                )
                            }
                            {
                                isLoggedIn ? (
                                    <Fragment>
                                        <li className="nav-item"><NavLink className="nav-link" to="/user-dashboard">{HEADER_USER_DASHBOARD}</NavLink></li>
                                        <li className="nav-item"><NavLink className="nav-link" to="/profile">{HEADER_PROFILE}</NavLink></li>
                                        <li className="nav-item" onClick={this.props.onDisconnect}><a className="nav-link" style={{ cursor: "pointer" }}>{HEADER_DISCONNECT}</a></li>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <li><NavLink className="nav-link" to="/signin">{HEADER_SIGNIN}</NavLink></li>
                                        <li><NavLink className="nav-link" to="/register">{HEADER_REGISTER}</NavLink></li>
                                    </Fragment>
                                )
                            }
                            <li><NavLink className="nav-link" to="/contact">{HEADER_CONTACT}</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </Container>
        );
    }
}

export default withRouter(withLanguage(Header));
  