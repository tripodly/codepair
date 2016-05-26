import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './header';

const style = {
  footer: {
    position: 'relative',
    height: 136,
    verticalAlign: 'bottom',
    backgroundColor: '#212121',
    color: '#585858',
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

