import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  child: {
    marginTop: 20,
  },
  innerChild: {
    width: '100%',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default class Landing extends Component  {
  render() {
	 return (
    <div style={style}>
      <div style={style.child}>
        <h2>Welcome to CodePair!</h2>
        <ReactPlayer url ='https://www.youtube.com/watch?v=dQw4w9WgXcQ' playing={false} />
        <RaisedButton label={"Sign Up"} fullWidth={true} secondary={true}/>
      </div>
    </div>
	 );
  }
}