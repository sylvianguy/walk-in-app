import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {

		}
		this.handleChange = this.handleChange.bind(this)
		this.socialLogin = this.socialLogin.bind(this)
	}
	handleChange(e) {
		console.log("sdad", e)
	}
	socialLogin() {
		const provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  const token = result.credential.accessToken;
		  // The signed-in user info.
		  const user = result.user;
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  // The email of the user's account used.
		  const email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  const credential = error.credential;
		  // ...
		});
	}
	render() {
		return (
			<div className="welcome">
				<div className="wrapper welcome--wrapper">
					<div className="welcome--left">
						<form className="signIn__box">
							<h2>Log-In</h2>
							<input type='text' placeholder='email' name='email' onChange={this.handleChange}/>
							<input type='password' name='password' placeholder='password' onChange={this.handleChange}/>
							<div className="signIn__box--buttons">
								<input className="button button--login" type='submit' value='Log in'/>
								<input className="button button--submit button--submit-bare" type='submit' value='Create Account'/>
							</div>
							<div className="signIn__box--social">
								<p>OR</p>
								<input type="submit" className="button button--google" onClick={() => this.socialLogin} value="Google" />
								<input type="submit" className="button button--facebook" onClick={() => this.socialLogin} value="Facebook" />
							</div>
						</form>
					</div>
					<div className="welcome--right">
						<h1>W</h1>
						<h2>Welcome to the Walk-in app</h2>
					</div>
				</div>
			</div>
		)
	}
}