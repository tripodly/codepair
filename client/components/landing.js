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
    fontSize: '2.1em',
    marginBottom: 20,
    color: '#FF0A9C',
  },

  video: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    // marginTop: 20,
    width: 640,
    height: 36,
  },

}

export default class Landing extends Component  {
  render() {
	 return (
    <div style={style}>
      <div style={style.title}>
        <h2 style={style.title}>Welcome to CodePair!</h2>
      </div>
      <div style={style.video}>
        <ReactPlayer url ='https://www.youtube.com/watch?v=Q8TXgCzxEnw' playing={false} />
      </div>
      <div style={style.button}>
        <Link to="/signup"><RaisedButton label={"Sign Up"} style={style.button} fullWidth={true} secondary={true}/></Link>
      </div>
    </div>
	 );
  }
}