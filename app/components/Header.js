import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import * as ranks from '../constants/Ranks';

class Header extends React.Component {
  render()
  {
    const active = { borderBottomColor: '#3f51b5' };
    const adminDashboard = this.props.user.rank == ranks.ADMIN ? <li><Link to="/admin-dashboard" activeStyle={active}>Admin Dashboard</Link></li> : null;
    const userDashboard = this.props.user.token != null ? <li><Link to="/user-dashboard" activeStyle={active}>User Dashboard</Link></li> : null;
    const profile = this.props.user.token != null ? <li><Link to="/profile" activeStyle={active}>Profile</Link></li> : null;
    const disconnect = this.props.user.token != null ? <li><Link to="/disconnect" activeStyle={active}>Disconnect</Link></li> : null;
    const signIn = this.props.user.token == null ? <li><Link to="/signin" activeStyle={active}>Sign In</Link></li> : null;
    const register = this.props.user.token == null ? <li><Link to="/register" activeStyle={active}>Register</Link></li> : null;
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
            <IndexLink to="/" className="navbar-brand">Hubgine</IndexLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeStyle={active}>Home</IndexLink></li>
              <li><Link to="/contact" activeStyle={active}>Contact</Link></li>
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

export default connect(mapStateToProps)(Header);
