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
		console.log(user.name);
		console.log(user.email);
		console.log(user.password);
		
		if(user.password === user.confirm) {
			firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
				.then((data) => {
					console.log(data);
					var userId = data.uid;
					firebase.database().ref(userId).set({salonName:user.name}) 
					this.context.router.push('/setup');

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
				<h2>Create User</h2>
				<form action="" onSubmit={e => this.createUser.call(this, e)}>
					<label>Enter your salon name:</label>
					<input type='text' name='createName' placeholder='salon name' ref={ref => this.createName = ref} />
					<br/>
					<br/>
					<label>Enter your email:</label>
					<input type='text' placeholder='email' ref={ref => this.createEmail = ref }/>
					<br/>
					<br/>
					<label>Enter your password:</label>
					<input type='password' placeholder='password' ref={ref => this.createPassword = ref }/>
					<br/>
					<br/>
					<label>Confirm your password:</label>
					<input type='password' placeholder='confirm password' ref={ref => this.confirmPassword = ref }/>
					<br/>
					<br/>
					<input type='submit'/>
				</form>
			</div>
		)
	}
} 

createUser.contextTypes = {
	router: React.PropTypes.object
}





