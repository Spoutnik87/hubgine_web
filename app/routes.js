import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
import Signin from './components/Signin';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';
import EnsureIsAdministratorContainer from './components/EnsureIsAdministratorContainer';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import EnsureNotLoggedInContainer from './components/EnsureNotLoggedInContainer';
import Disconnect from './components/Disconnect';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

export default function getRoutes(store) {
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} onLeave={clearMessages}/>
      <Route path="/contact" component={Contact} onLeave={clearMessages}/>
      <Route component={EnsureLoggedInContainer}>
        <Route path="/user-dashboard" component={UserDashboard} onLeave={clearMessages}/>
        <Route path="/profile" component={Profile} onLeave={clearMessages}/>
        <Route path="/disconnect" component={Disconnect} onLeave={clearMessages}/>
        <Route component={EnsureIsAdministratorContainer}>
          <Route path="/admin-dashboard" component={AdminDashboard} onLeave={clearMessages}/>
        </Route>
      </Route>
      <Route component={EnsureNotLoggedInContainer}>
        <Route path="/signin" component={Signin} onLeave={clearMessages}/>
        <Route path="/register" component={Register} onLeave={clearMessages}/>
        <Route path="/forgot-password" component={ForgotPassword} onLeave={clearMessages}/>
      </Route>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
