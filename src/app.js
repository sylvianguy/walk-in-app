import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './noteCard.js';

const config = {
	apiKey: "AIzaSyDdgusKSLvegcrfPWyILFRwEC4y1Qg6-_c",
	authDomain: "noted-318ce.firebaseapp.com",
	databaseURL: "https://noted-318ce.firebaseio.com",
	storageBucket: "noted-318ce.appspot.com",
};

firebase.initializeApp(config);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			notes: []
		};
	}
	componentDidMount() {

		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				console.log('There is a user');
				firebase.database().ref(`users/${user.uid}/notes`)
					.once('value')
					.then((res) => {
						let userData = res.val();
						let dataArray = [];
						for(let key in userData) {
							dataArray.push(userData[key])
						}
						this.setState({
							notes: dataArray
						});
					});
			}
		});
	}
	toggleAddNote(e) {
		e.preventDefault();
		if(firebase.auth().currentUser) {
			this.sidebar.classList.toggle('show');
		}
		else {
			alert('Please login to add a new note');
		}
	}
	addNew(e) {
		e.preventDefault();
		const newNote = {
			title: this.noteTitle.value,
			text: this.noteText.value
		};
		const newState = Array.from(this.state.notes);
		newState.push(newNote);
		const currentUser = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${currentUser}/notes`);
		dbRef.push(newNote)
			.then(res => {
				this.setState({
					notes: newState
				});
				this.noteTitle.value = '';
				this.noteText.value = '';
				this.sidebar.classList.toggle('show');
			})
			.catch(err => {
				console.login(err);
			});
	}
	showLoginModal(e) {
		e.preventDefault();
		this.loginModal.classList.add('show');
	}
	loginUser(e) {
		e.preventDefault();
		const user = {
			email: this.userEmail.value,
			password: this.userPassword.value
		}
		firebase.auth()
			.signInWithEmailAndPassword(user.email,user.password)
			.then((res) => {
				this.loginModal.classList.remove('show');
			})
			.catch((err) => {
				alert(err.message);
			});
	}
	createModal(e) {
		e.preventDefault();
		this.createUserModal.classList.add('show');
	}
	createUser(e) {
		e.preventDefault();

		const user = {
			email: this.createEmail.value,
			password: this.createPassword.value,
			confirm: this.confirmPassword.value
		};
		if(user.confirm !== user.password) {
			alert('Please make sure you passwords match.');
			return;
		}
		firebase.auth()
			.createUserWithEmailAndPassword(user.email,user.password)
			.then((res) => {
				this.createUserModal.classList.remove('show');
			})
			.catch((err) => {
				alert(err.message)
			});

	}
	render() {
		return (
			<div>
				<header className="mainHeader">
					<h1>Noted</h1>
					<nav>
						<a href="" onClick={(e) => this.toggleAddNote.call(this,e)}>Add New</a>
						<a href="" onClick={(e) => this.showLoginModal.call(this,e)}>Login</a>
						<a href="" onClick={(e) => this.createModal.call(this,e)}>Create User</a>
					</nav>
				</header>
				<section className="notes">
					{this.state.notes.map((note,i) => <NoteCard note={note} key={i}/>)}
				</section>
				<aside ref={ref => this.sidebar = ref} className="sidebar">
					<h3>Add new note</h3>
					<form onSubmit={(e) => this.addNew.call(this,e)}>
						<i className="fa fa-times" onClick={e => this.toggleAddNote.call(this,e)}></i>
						<input type="text" name="note-title" ref={ref => this.noteTitle = ref}/>
						<textarea name="note-text" ref={ref => this.noteText = ref}></textarea>
						<input type="submit"/>
					</form>
				</aside>
				<div className="overlay"></div>
				<div className="loginModal modal" ref={ref => this.loginModal = ref}>
					<form action="" onSubmit={e => this.loginUser.call(this,e)}>
						<div>
							<label htmlFor="email">Email:</label>
							<input type="text" name="email" ref={ref => this.userEmail = ref}/>
						</div>
						<div>
							<label htmlFor="password">Password:</label>
							<input type="password" name="password" ref={ref => this.userPassword = ref}/>
						</div>
						<input type="submit"/>
					</form>
				</div>
				<div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
					<form action="" onSubmit={e => this.createUser.call(this,e)}>
						<div>
							<label htmlFor="createEmail">Email:</label>
							<input type="text" name="createEmail" ref={ref => this.createEmail = ref}/>
						</div>
						<div>
							<label htmlFor="createPassword">Password:</label>
							<input type="password" name="createPassword" ref={ref => this.createPassword = ref}/>
						</div>
						<div>
							<label htmlFor="confirmPassword">Confirm Password:</label>
							<input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref}/>
						</div>
						<input type="submit"/>
					</form>
				</div>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));