import React from 'react';

export default class Login extends React.Component {
	render() {
		return (
			<div className="signIn__box">
				<h2>Log-In</h2>
				<input type='text' placeholder='username'/>
				<input type='text' placeholder='password'/>
				<input className="button button--submit" type='submit' value='Log in'/>
			</div>

		)
	}
}