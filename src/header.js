import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component{
	constructor() {
		super();
		this.state = {
			signedIn: false
		}
		this.signOut = this.signOut.bind(this)
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => { 
			console.log("user", user)
			var userId = user.uid
			firebase.database().ref(userId)
				.on('value', (res) => {
					console.log("what", res.val())
				})

			const currentUser = firebase.auth().currentUser;
			// console.log("curee", currentUser
			if(currentUser === null) {
				console.log("not logged in")
				this.setState({
					signedIn: false
				})
			}else {
				console.log("logged In")
				this.setState({
					signedIn: true
				})
			}
 		})
	}
	signOut() {
		console.log("sign out")
		firebase.auth().signOut()
			.then(() => {
				console.log("success");
			})
			.catch((err) => {
				console.log("error");
			})
	}
	render() {
		const loggedIn = <a className="button--round" onClick={() => this.signOut()}>Sign Out</a>;
		const loggedOut = <Link className="button--round" to="/login">Sign In</Link>;
		return (
			<header className="mainHeader">
				<div className="mainHeader__block wrapper">
					<h1>W</h1>
					<div className="mainHeader__cta">
						<Link to="/createUser" className="button--round">Create Account</Link>
						{this.state.signedIn === false ? loggedOut : loggedIn}
					</div>
				</div>
			</header>
		)
	}
}