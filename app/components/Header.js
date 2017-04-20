import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ranks from '../constants/Ranks';

class Header extends React.Component {
  render()
  {
    const active = { borderBottomColor: '#3f51b5' };
    const adminDashboard = this.props.user.rank == ranks.ADMIN ? <li><NavLink to="/admin-dashboard" activeStyle={active}>Admin Dashboard</NavLink></li> : null;
    const userDashboard = this.props.user.token != null ? <li><NavLink to="/user-dashboard" activeStyle={active}>User Dashboard</NavLink></li> : null;
    const profile = this.props.user.token != null ? <li><NavLink to="/profile" activeStyle={active}>Profile</NavLink></li> : null;
    const disconnect = this.props.user.token != null ? <li><NavLink to="/disconnect" activeStyle={active}>Disconnect</NavLink></li> : null;
    const signIn = this.props.user.token == null ? <li><NavLink to="/signin" activeStyle={active}>Sign In</NavLink></li> : null;
    const register = this.props.user.token == null ? <li><NavLink to="/register" activeStyle={active}>Register</NavLink></li> : null;
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
            <Link to="/" className="navbar-brand">Hubgine</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><NavLink to="/" activeStyle={active} exact>Home</NavLink></li>
              <li><NavLink to="/contact" activeStyle={active}>Contact</NavLink></li>
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
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(Header));
