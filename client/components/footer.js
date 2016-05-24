import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './header';

const style = {
  footer:{
    backgroundColor: "black",
  }
}
export default class Footer extends Component {

  render(){
    return (
      <footer style={style.footer} >
        <div>
          <h1>blahblahblah</h1>
        </div>
      </footer>
    );
  }
}

