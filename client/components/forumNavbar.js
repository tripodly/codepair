import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const style = {
	customList:{
		height:'600',
		overflow: 'scroll',
	},
	comment:{
		height: 100,
		marginTop: 25,
		marginLeft: 150,
		marginRight: 150,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		display: 'inline-block',
		width: '100%',
	},
	commentButton: {
		marginTop: -100,
	},
	button: {
		textDecoration: 'none',
		color: 'white',
	},
	forumWindow: {
		textAlign: 'left',
		width: '100%',
		height: 800,
	},
	optionsBar: {
		width: '100%',
		height: 50,
		backgroundColor: '#FF0A9C',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	optionElement: {
		display: 'inline-block',
		paddingRight: 10,
		verticalAlign: 'middle',
	},
	optionsElements: {
		float: 'right',
		display: 'inline-block',
		alignItems: 'center',
	},
	optionsMenu: {
		marginTop: -15,
	},
	textField:{
		border:' 3px solid #585858',
		marginTop: 15,
		marginBottom:15,
		width: '50%',
		height: 200,
	},
	subject:{
		width: '50%',
		border:' 3px solid #585858',
	},
	newPost:{
		height: 400,
		marginTop: 25,
		marginLeft: 150,
		marginRight: 150,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor:'#D8D8D8',
	},
	mainPost:{
		border:' 3px solid #585858',
		backgroundColor:'#D8D8D8',
	},
}
class ForumNavbar extends Component {
constructor(props){
	super(props);
	this.state = {

	}
}
	render(){
		return (
			<AppBar style={style.optionsBar} showMenuIconButton={false}
				children={
					<div style={style.optionsElements}>
						<div style={style.optionElement}>
							<FlatButton onClick={this.props.handleModal} style={style.button} label="Post" />
						</div>
						<div style={style.optionElement}>
							<DropDownMenu style={style.button} value={this.state.filter} onChange={(event, index, value) => this.handleChange(event, index, value)}>
			          <MenuItem value={'Most Recent'} primaryText="Most Recent" />
			          <MenuItem value={'Up-Votes'} primaryText="Up-Votes" />
			          <MenuItem value={'Most Comments'} primaryText="Most Comments" />
			        </DropDownMenu>
						</div>
					</div>
				}
			/>
		)
	}
}
export default ForumNavbar;