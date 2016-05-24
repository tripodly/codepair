import React, { Component } from 'react';
import Header from './header';
import Paper from 'material-ui/Paper';

const style = {
		paper: {
				textAlign: 'center',
				minHeight: 900,
		},
		app: {
				paddingRight: 40,
				paddingLeft: 40,
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
