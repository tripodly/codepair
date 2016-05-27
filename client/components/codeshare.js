import React, { Component } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/ambiance';

const style = {
	codeWindow: {
		textAlign: 'left',
		width: '100%',
		height: 800,
	}
}

class CodeShare extends Component {

	onChange(newValue) {
		console.log('values have changed, they are now : ',newValue);
	}

	render() {
		return (
			<div style={style.codeWindow}>				
				<AceEditor
				    mode="javascript"
				    theme="ambiance"
				    height="100%"
				    width="100%"
				    onChange={(value) => this.onChange(value)}
				    name="UNIQUE_ID_OF_DIV"
				    editorProps={{$blockScrolling: true}}
				  />
			</div>
		);
	}
};

export default CodeShare;