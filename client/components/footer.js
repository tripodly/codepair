import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './header';
import IconButton from 'material-ui/IconButton';
import Love from 'material-ui/svg-icons/action/favorite';
import FontIcon from 'material-ui/FontIcon';

const style = {
  footer: {
    position: 'relative',
    height: 136,
    verticalAlign: 'bottom',
    backgroundColor: '#212121',
    color: '#585858',
  },
  footerBar: {

  },
  icon: {
    color: '#585858',
  }

}
export default class Footer extends Component {

  render(){
    return (
      <footer style={style.footer} >
      </footer>
    );
  }
}

