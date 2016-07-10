import React, {Component} from 'react';

class ForumNavbar extends Component {


	render(){
		return (
			<AppBar style={style.optionsBar} showMenuIconButton={false}
				children={
					<div style={style.optionsElements}>
					<div style={style.optionElement}>
						<FlatButton onClick={()=> this.props.getPosts()} style={style.button} label="Back" />
					</div>
						<div style={style.optionElement}>
							<FlatButton onClick={()=> this.handleModal()} style={style.button} label="Submit a Post" />
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