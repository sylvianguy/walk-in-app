import React from 'react';
import {Link} from 'react-router';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {
				email: "",
				password: ""
			},
			errorMessage: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.loginUser = this.loginUser.bind(this)
	}
	handleChange(e) {
		const ogUser = Object.assign({}, this.state.user);
		ogUser[e.target.name] = e.target.value
		this.setState({
			user: ogUser
		})
	}
	loginUser(e) {
		e.preventDefault();
		const user = this.state.user;
		firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			.then((res) => {
				const userId = res.uid;
				firebase.database().ref(userId)
					.on('value', (data) => {
						console.log("lalala", data.val()) 
					})
						this.context.router.push('/dashboard');
			})
			.catch((err) => {
				this.setState({
					errorMessage: true
				})
			})
	}
	render() {
		const errorMessage = (
			<p>The password is invalid or the user does not have a password</p>
		)
		return (
			<form className="signIn__box" onSubmit={(e) => this.loginUser(e)}>
				<h2>Log-In</h2>
				<input type='text' placeholder='email' name='email' onChange={this.handleChange}/>
				<input type='password' name='password' placeholder='password' onChange={this.handleChange}/>
				<input className="button button--submit" type='submit' value='Log in'/>
				{this.state.errorMessage === true ? errorMessage : null}
			</form>

		)
	}
}

Login.contextTypes = {
	router: React.PropTypes.object
}