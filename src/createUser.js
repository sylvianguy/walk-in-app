import React from 'react';
import {Link} from 'react-router';

export default class createUser extends React.Component {
	createUser(e) {
		e.preventDefault();
		const user = {
			name: this.createName.value,
			email: this.createEmail.value,
			password: this.createPassword.value,
			confirm: this.confirmPassword.value
		}
		
		if(user.password === user.confirm) {
			firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
				.then((data) => {
					console.log(data);
					var userId = data.uid;
					firebase.database().ref(userId).set({
						name:user.name,
						password: user.password,
						email: user.email
					}) 
					//push to a new router 
					this.context.router.push('/times');

				})
				.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
		}
	}
	render() {
		return (
			<div>
				<form className="signIn__box" action="" onSubmit={e => this.createUser.call(this, e)}>
					<h2>Create User</h2>
					<input type='text' name='createName' placeholder='username' ref={ref => this.createName = ref} />
					<input type='text' placeholder='email' ref={ref => this.createEmail = ref }/>
					<input type='password' placeholder='password' ref={ref => this.createPassword = ref }/>
					<input type='password' placeholder='confirm password' ref={ref => this.confirmPassword = ref }/>
					<input className="button button--submit" type='submit'/>
				</form>
			</div>
		)
	}
} 

createUser.contextTypes = {
	router: React.PropTypes.object
}





