import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router, Link, browserHistory, IndexRoute } from 'react-router';
import About from './about.js';
import Salon from './salon.js';
import Home from './home.js';
import Login from './login.js';
import CreateUser from './createUser.js';
import Setup from './setup.js';
import SetupTime from './setupTime.js';
import SetupServices from './setupServices';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			userAuth: []
		};
		var config = {
			apiKey: "AIzaSyACnQ3DNs0ye0yrgLGC6ispWgbOeUHFdM8",
			authDomain: "walk-in-87122.firebaseapp.com",
			databaseURL: "https://walk-in-87122.firebaseio.com",
			storageBucket: "walk-in-87122.appspot.com",
			messagingSenderId: "789650229559"
		};
		firebase.initializeApp(config);
	}

	componentDidMount() {
		//check to see if user is logged in

	}

	render() {
		return (
			<div className="header">
				<h1>Walk-in App</h1>
				{this.props.children}
			</div>
		)
	}

}

ReactDom.render(
	<Router history={browserHistory}>
		<Route path="/" component={App} >
		<IndexRoute component={Home}/>
			<Route path="login" component={Login} />
			<Route path="setup" component={Setup} />
			<Route path="createUser" component={CreateUser} />
			<Route path="setupTime" component={SetupTime} />
			<Route path="about" component={About}/>
			<Route path="salon/:client" component={Salon}/>
			<Route path="setupServices" component={SetupServices} />
		</Route>
	</Router>
	, document.getElementById('app'));
