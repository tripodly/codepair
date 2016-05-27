import React, { Component } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';



class CodeShare extends Component {

	onChange(newValue) {
		console.log('values have changed, they are now : ',newValue);
	}

	render() {
		return (
			<div>
				<div>Testing 1...2...3...</div>
				<AceEditor
				    mode="java"
				    theme="github"
				    onChange={(value) => this.onChange(value)}
				    name="UNIQUE_ID_OF_DIV"
				    editorProps={{$blockScrolling: true}}
				  />
			</div>
		);
	}
};

export default CodeShare;