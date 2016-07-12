import React, { Component } from 'react';
import Paper from 'material-ui/Paper';


class ForumItem extends Component {
	render() {
		return (
			<div>
				<Paper zDepth={0} className='forumItem' key={this.props.item.id}>
					<div>{ this.props.item.userID}</div>
					<div>{ this.props.item.comment}</div>
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