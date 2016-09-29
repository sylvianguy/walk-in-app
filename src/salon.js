import React from 'react';

export default class Salon extends React.Component {
	
	render() {
		return (
			<h1>This is the {this.props.params.client} Salon page!</h1>
		)
	}
}