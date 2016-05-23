import React, { Component } from 'react';
import Header from './header';
import Paper from 'material-ui/Paper';

const style = {
		paper: {
				width: '100%',
				textAlign: 'center',
				display: 'inline-block',
				minHeight: 900,
		},
		app: {
				paddingRight: 40,
				paddingLeft: 40,
				margin: 'auto',
				minHeight: 1000,
		},

};

export default class App extends Component {
  render() {
    return (
      <div style={style.app} >
					<Paper style={style.paper} zDepth={2}>
							<Header />
							{this.props.children}
					</Paper>
      </div>
    );
  }
}
