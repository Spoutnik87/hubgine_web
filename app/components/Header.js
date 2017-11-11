import React, { Component } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
    }).isRequired
  };

  render()
  {
    const active = { borderBottomColor: "#3f51b5" };
    const isLoggedIn = this.props.user.token !== undefined;
    const isAdmin = this.props.user.rank === Ranks.ADMIN;
    const { HEADER_SR_ONLY, HEADER_ADMIN_DASHBOARD, HEADER_USER_DASHBOARD, HEADER_PROFILE, HEADER_DISCONNECT, HEADER_SIGNIN, HEADER_REGISTER, COMPANY_NAME, HEADER_HOME } = this.props.lang;
    const menu = [];
    if (isAdmin)
    {
      menu.push(<li><NavLink to="/admin-dashboard" activeStyle={active}>{HEADER_ADMIN_DASHBOARD}</NavLink></li>);
    }
    if (isLoggedIn)
    {
      menu.push(<li><NavLink to="/user-dashboard" activeStyle={active}>{HEADER_USER_DASHBOARD}</NavLink></li>);
      menu.push(<li><NavLink to="/profile" activeStyle={active}>{HEADER_PROFILE}</NavLink></li>);
      menu.push(<li><NavLink to="/disconnect" activeStyle={active}>{HEADER_DISCONNECT}</NavLink></li>);
    }
    else
    {
      menu.push(<li><NavLink to="/signin" activeStyle={active}>{HEADER_SIGNIN}</NavLink></li>);
      menu.push(<li><NavLink to="/register" activeStyle={active}>{HEADER_REGISTER}</NavLink></li>);
    }
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggle collapsed">
              <span className="sr-only">{HEADER_SR_ONLY}</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">{COMPANY_NAME}</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><NavLink to="/" activeStyle={active} exact>{HEADER_HOME}</NavLink></li>
              {menu.map((element, index) => (
                {...element, key: index}
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lang: state.lang
  };
};

export default withRouter(connect(mapStateToProps)(Header));
