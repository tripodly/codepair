import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

const style = {
  list: {
        minHeight: 600,
    }
};

class chatListItem extends Component {
	render() {
		const item = this.props.item;
		const context = this.props.context;
		let date = item.created_at ? item.created_at.toString().substring(0,10) : '';
		let handleClick = function(){};
		if(this.props.handleClick){
			handleClick = this.props.handleClick.bind(context,item);
		}
	return (
		<List style={style.list}>
        <Subheader>User: {props.name}</Subheader>
        <ListItem
          primaryText="Brunch this weekend?"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brendan Lim</span> --
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
        	key={this.props.item.id}
					primaryText={ this.props.item.subject || item.comment } 
					secondaryText={ this.props.item.message || date }
					onTouchTap={() => {handleClick()} }
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
          primaryText="Oui oui"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Grace Ng</span> --
              Do you have Paris recommendations? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        </List>
	)
}
}
export default chatListItem;