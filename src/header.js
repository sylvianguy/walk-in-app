import React from 'react';
import {Link} from 'react-router';
import Menu from './menu';

export default class Header extends React.Component{
	constructor() {
		super();
		this.state = {
			signedIn: false,
			userName: ''
		}
		this.signOut = this.signOut.bind(this)
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => { 
			var userId = user.uid
			console.log(user)
			firebase.database().ref(userId)
				.on('value', (res) => {
					// console.log("what", res.val())
					this.setState({
						userName: res.val().name
					})
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
				this.setState({
					signedIn: false
				})
				this.context.router.push('/');
			})
			.catch((err) => {
				console.log("error");
			})
	}
	render() {
		const loggedIn = <a className="button--round" onClick={() => this.signOut()}>Sign Out</a>;
		const loggedOut = <Link className="button--round" to="/">Sign In</Link>;
		const createAccount = <Link to="/createUser" className="button--round button--round-createAcc">Create Account</Link>;
		const greeting = <h4>Hello, {this.state.userName}!</h4>;
		const showLoginInfo = (
			<div className="mainHeader__cta">
				{this.state.signedIn ?  greeting : null}
				{this.state.signedIn ? null : createAccount}
				{this.state.signedIn ? loggedIn : loggedOut}
			</div>
		)
		return (
			<header className="mainHeader">
				<div className="mainHeader__block wrapper">
					<Link to="/"><h1>W</h1></Link>
					{this.props.location !== '/' ? showLoginInfo : null}
				</div>
			</header>
		)
	}
}

Header.contextTypes = {
	router: React.PropTypes.object
}