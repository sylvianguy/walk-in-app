import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {
				email: "",
				password: ""
			}
		}
		this.handleChange = this.handleChange.bind(this)
		this.signInGoogle = this.signInGoogle.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.signInFacebook = this.signInFacebook.bind(this)
		this.signInWithEmail = this.signInWithEmail.bind(this)
	}
	handleChange(e) {
		const ogUser = Object.assign({}, this.state.user);
		ogUser[e.target.name] = e.target.value
		this.setState({
			user: ogUser
		})
	}
	signInGoogle(e) {
		e.preventDefault()
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  const token = result.credential.accessToken;
		  // The signed-in user info.
		  const user = result.user;
		  this.context.router.push('/setup');
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
	signInFacebook(e) {
		e.preventDefault();
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
	}
	signInWithEmail() {
		// e.preventDefault();
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
	handleSubmit(e) {
		console.log("does it work?");
		e.preventDefault();
	}
	render() {
		return (
			<div className="welcome">
				<div className="wrapper welcome--wrapper">
					<div className="welcome--left">
						<form className="signIn__box" onSubmit={this.handleSubmit}>
							<h2>Log-In</h2>
							<p>Please login with your email and password!</p>
							<input type='text' placeholder='email' name='email' onChange={this.handleChange}/>
							<input type='password' name='password' placeholder='password' onChange={this.handleChange}/>
							<div className="signIn__box--buttons">
								<input className="button button--login" type='submit' onClick={this.signInWithEmail} value='Log in'/>
								<input className="button button--submit button--submit-bare" type='submit' value='Create Account'/>
							</div>
							<div className="signIn__box--social">
								<p>OR</p>
								<input type="submit" className="button button--google" onClick={this.signInGoogle} value="Google" />
								<input type="submit" className="button button--facebook" onClick={this.signInFacebook} value="Facebook" />
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

Home.contextTypes = {
	router: React.PropTypes.object
}