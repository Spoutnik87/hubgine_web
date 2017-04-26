import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Signin from './Signin';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import Disconnect from './Disconnect';
import Profile from './Profile';
import NotFound from './NotFound';
import VisitorRoute from './VisitorRoute';
import MemberRoute from './MemberRoute';
import AdminRoute from './AdminRoute';

class App extends React.Component {
  render()
  {
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <MemberRoute path="/user-dashboard" component={UserDashboard} />
          <MemberRoute path="/profile" component={Profile} />
          <MemberRoute path="/disconnect" component={Disconnect} />
          <AdminRoute path="/admin-dashboard" component={AdminDashboard} />
          <VisitorRoute path="/signin" component={Signin} />
          <VisitorRoute path="/register" component={Register} />
          <VisitorRoute path="/forgot-password" component={ForgotPassword} />
          <Route component={NotFound} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;