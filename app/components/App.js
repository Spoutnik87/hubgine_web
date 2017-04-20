import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Contact from './Contact';
import NotFound from './NotFound';
import getRoutes from './../routes';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.clearMessages = this.clearMessages.bind(this);
  }


  clearMessages()
  {
    //this.props.dispatch({ type: 'CLEAR_MESSAGES' });
    console.log("a");
  }

  render()
  {
    console.log("qc");
    return (
      <div>
        <Header/>
          <Switch>
            {
              getRoutes(this).map((route, index) => (
                <Route key={index} {...route} />
              ))
            }
          </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect()(App));

/*<Route exact path='/' component={Home} onLeave={this.clearMessages} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />*/