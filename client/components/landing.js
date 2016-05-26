import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  title: {
    fontFamily: 'True_Lies',
    textAlign: 'center',
  },

  child: {
    marginTop: 20,
  },

  innerChild: {
    width: '100%',
  },
}

export default class Landing extends Component  {
  render() {
	 return (
    <div style={style}>
      <div style={style.child}>
        <h2 style={style.title}>Welcome to CodePair!</h2>
        <ReactPlayer url ='https://www.youtube.com/watch?v=Q8TXgCzxEnw' playing={false} />
        <RaisedButton label={"Sign Up"} fullWidth={true} secondary={true}/>
      </div>
    </div>
	 );
  }
}