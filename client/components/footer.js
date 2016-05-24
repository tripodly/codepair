import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './header';

const style = {
  footer: {
    position: 'relative',
    marginTop: 400,
    height: 150,
    verticalAlign: 'bottom',
    backgroundColor: '#000',
    color: '#FFF',
  },

}
export default class Footer extends Component {

  render(){
    return (
      <footer style={style.footer} >
        <div style={style.footerBar}>
          <h5>blahblahblah</h5>
        </div>
      </footer>
    );
  }
}

