import React from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ranks from '../constants/Ranks';

class Header extends React.Component {
  render()
  {
    const active = { borderBottomColor: '#3f51b5' };
    const adminDashboard = this.props.user.rank == ranks.ADMIN ? <li><NavLink to="/admin-dashboard" activeStyle={active}>{this.props.lang.HEADER_ADMIN_DASHBOARD}</NavLink></li> : null;
    const userDashboard = this.props.user.token != null ? <li><NavLink to="/user-dashboard" activeStyle={active}>{this.props.lang.HEADER_USER_DASHBOARD}</NavLink></li> : null;
    const profile = this.props.user.token != null ? <li><NavLink to="/profile" activeStyle={active}>{this.props.lang.HEADER_PROFILE}</NavLink></li> : null;
    const disconnect = this.props.user.token != null ? <li><NavLink to="/disconnect" activeStyle={active}>{this.props.lang.HEADER_DISCONNECT}</NavLink></li> : null;
    const signIn = this.props.user.token == null ? <li><NavLink to="/signin" activeStyle={active}>{this.props.lang.HEADER_SIGNIN}</NavLink></li> : null;
    const register = this.props.user.token == null ? <li><NavLink to="/register" activeStyle={active}>{this.props.lang.HEADER_REGISTER}</NavLink></li> : null;
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">{this.props.lang.COMPANY_NAME}</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><NavLink to="/" activeStyle={active} exact>{this.props.lang.HEADER_HOME}</NavLink></li>
              {adminDashboard}
              {userDashboard}
              {profile}
              {disconnect}
              {signIn}
              {register}
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
