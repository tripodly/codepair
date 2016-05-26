import React, { Component } from 'react';
import Header from './header';
import Paper from 'material-ui/Paper';
import Footer from './footer';

const style = {
		paper: {
				textAlign: 'center',
				minHeight: 1000,
		},
		app: {
				// paddingRight: 40,
				// paddingLeft: 40,
				minHeight: 1000,
		},
		body: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: 800,
		},
};

export default class App extends Component {
  render() {
    return (
      <div style={style.app} >
					<Paper style={style.paper} zDepth={2}>
							<Header />
							<div style={style.body}>
								{this.props.children}
							</div>
              <Footer />
					</Paper>
          
      </div>
    );
  }
}
