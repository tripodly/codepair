import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import Avatar from 'material-ui/Avatar';

class ForumItem extends Component {
	render() {
		return (
			<div>
				<Paper zDepth={0} className='forumItem' key={this.props.item.id}>
					<Avatar src={this.props.item.profile_url} />
					<div className='content'>{ this.props.item.name}</div>
					<div className='content'>{ this.props.item.comment}</div>
					<div className='date'>
						{moment(this.props.item.created_at).fromNow()}
					</div>
				</Paper>
				<hr style={{margin:'1px'}}/>
			</div>
		);
	}
}

export default ForumItem;