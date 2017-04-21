import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import * as ranks from '../constants/Ranks';

class Header extends React.Component {
  render()
  {
    const active = { borderBottomColor: '#3f51b5' };
    const adminDashboard = this.props.user.rank == ranks.ADMIN ? <li><Link to="/admin-dashboard" activeStyle={active}>{this.props.lang.HEADER_ADMIN_DASHBOARD}</Link></li> : null;
    const userDashboard = this.props.user.token != null ? <li><Link to="/user-dashboard" activeStyle={active}>{this.props.lang.HEADER_USER_DASHBOARD}</Link></li> : null;
    const profile = this.props.user.token != null ? <li><Link to="/profile" activeStyle={active}>{this.props.lang.HEADER_PROFILE}</Link></li> : null;
    const disconnect = this.props.user.token != null ? <li><Link to="/disconnect" activeStyle={active}>{this.props.lang.HEADER_DISCONNECT}</Link></li> : null;
    const signIn = this.props.user.token == null ? <li><Link to="/signin" activeStyle={active}>{this.props.lang.HEADER_SIGNIN}</Link></li> : null;
    const register = this.props.user.token == null ? <li><Link to="/register" activeStyle={active}>{this.props.lang.HEADER_REGISTER}</Link></li> : null;
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
            <IndexLink to="/" className="navbar-brand">{this.props.lang.COMPANY_NAME}</IndexLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeStyle={active}>{this.props.lang.HEADER_HOME}</IndexLink></li>
              <li><Link to="/contact" activeStyle={active}>{this.props.lang.HEADER_CONTACT}</Link></li>
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

export default connect(mapStateToProps)(Header);
