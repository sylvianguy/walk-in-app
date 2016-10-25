import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router, Link, browserHistory, IndexRoute } from 'react-router';
import About from './about';
import Salon from './salon';
import Home from './home';
import Login from './login';
import CreateUser from './createUser';
import Setup from './setup';
import SetupTime from './setupTime';
import SetupServices from './setupServices';
import Dashboard from './dashboard';
import Header from './header';


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
		const header = <Header history={this.props.history} />
		return (
			<div className="wrapper">
				{header}
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
			<Route path="dashboard" component={Dashboard} />
		</Route>
	</Router>
	, document.getElementById('app'));
