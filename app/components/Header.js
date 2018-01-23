import React, { Component } from "react";
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
            HEADER_SR_ONLY: PropTypes.string.isRequired,
            HEADER_HOME: PropTypes.string.isRequired,
            HEADER_ADMIN_DASHBOARD: PropTypes.string.isRequired,
            HEADER_USER_DASHBOARD: PropTypes.string.isRequired,
            HEADER_PROFILE: PropTypes.string.isRequired,
            HEADER_DISCONNECT: PropTypes.string.isRequired,
            HEADER_SIGNIN: PropTypes.string.isRequired,
            HEADER_REGISTER: PropTypes.string.isRequired
          }).isRequired,
          onDisconnect: PropTypes.func
    };

    static defaultProps = {
        onDisconnect: () => {}
    };

    render()
    {
        const active = { borderBottomColor: "#3f51b5" };
        const isLoggedIn = this.props.user.token !== undefined;
        const isAdmin = this.props.user.rank === Ranks.ADMIN;
        const {
            HEADER_SR_ONLY,
            HEADER_ADMIN_DASHBOARD,
            HEADER_USER_DASHBOARD,
            HEADER_PROFILE,
            HEADER_DISCONNECT,
            HEADER_SIGNIN,
            HEADER_REGISTER,
            COMPANY_NAME,
            HEADER_HOME
        } = this.props.lang;
        const menu = [];
        if (isAdmin)
        {
            menu.push(<li className="nav-item"><NavLink className="nav-link" to="/admin-dashboard" activeStyle={active}>{HEADER_ADMIN_DASHBOARD}</NavLink></li>);
        }
        if (isLoggedIn)
        {
            menu.push(<li className="nav-item"><NavLink className="nav-link" to="/user-dashboard" activeStyle={active}>{HEADER_USER_DASHBOARD}</NavLink></li>);
            menu.push(<li className="nav-item"><NavLink className="nav-link" to="/profile" activeStyle={active}>{HEADER_PROFILE}</NavLink></li>);
            menu.push(<li className="nav-item" onClick={this.props.onDisconnect}><a className="nav-link" style={{ cursor: "pointer" }}>{HEADER_DISCONNECT}</a></li>);
        }
        else
        {
            menu.push(<li><NavLink className="nav-link" to="/signin" activeStyle={active}>{HEADER_SIGNIN}</NavLink></li>);
            menu.push(<li><NavLink className="nav-link" to="/register" activeStyle={active}>{HEADER_REGISTER}</NavLink></li>);
        }
        return (
            <Container>
                <nav className="navbar navbar-expand-md navbar-light">
                    <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggler collapsed">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/" className="navbar-brand">{COMPANY_NAME}</Link>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink className="nav-link" to="/" activeStyle={active} exact>{HEADER_HOME}</NavLink></li>
                            {
                                menu.map((element, index) => (
                                    {...element, key: index}
                                ))
                            }
                        </ul>
                    </div>
                </nav>
            </Container>
        );
    }
}

export default withRouter(withLanguage(Header));
  