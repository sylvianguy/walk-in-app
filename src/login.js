import React from 'react';

export default class Login extends React.Component {
	render() {
		return (
			<div>
				<h2>Sign-In</h2>
				<input type='text' placeholder='salon name'/>
				<br/>
				<br/>
				<input type='text' placeholder='password'/>
				<br/>
				<br/>
				<input type='submit'/>
			</div>

		)
	}
}