import React, { Component } from 'react';
import ReactPlayer from 'react-player';

export default class Landing extends Component  {
  render() {
	 return (
		<div>
			Welcome to CodePair!
      <div id="video_stage">
        <ReactPlayer url ='https://www.youtube.com/watch?v=dQw4w9WgXcQ' playing={true} />
      </div>
		</div>
	 );
  }
}