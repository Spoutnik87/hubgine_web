import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {

  render()
  {
    return (
      <div>
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default App;