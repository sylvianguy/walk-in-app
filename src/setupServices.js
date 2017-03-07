import React from 'react';
import {Link} from 'react-router';

export default class setupServices extends React.Component {
	constructor() {
		super();
		this.state = {
			services: [],
			currentServices: ''
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			firebase.database().ref(`${user.uid}/services`)
				.on('value', (res) => {
					const allData = res.val();
					console.log("what", res.val())
					const allDataArray = [];
					for(let key in allData) {
						allDataArray.push({
							key: key,
							service: allData[key]
						})
					}

					this.setState({
						services: allDataArray
					})

				})
		})
	}

	removeServices(serviceToRemove) {
		// const currentKey = servicesToRemove.key
		const currentUser = firebase.auth().currentUser;

		firebase.database().ref(`${currentUser.uid}/services/${serviceToRemove.key}`).remove();
	}

	addServices(e) {
		e.preventDefault();
		const inputValue = this.createService.value;

		const currentState = this.state.services
		currentState.push(inputValue);


		this.setState({
			services: currentState
		})


		const currentUser = firebase.auth().currentUser;
		if(currentUser) {
			firebase.database().ref(`${currentUser.uid}/services`)
				.push(inputValue)
		}

	}
	render() {
		return (
			<div>
				<section>
					<h2>Add your services here</h2>
					<form onSubmit={(e) => this.addServices.call(this, e)}>
						<input type="text" ref={ref => this.createService = ref}/>
						<br/>
						<input type="submit"/>
					</form>
				</section>
				<section>
					{this.state.services.map((service, i) =>{
						return (
							<div key={i}>
								<a href="#">
									<i className="fa fa-minus" onClick={(e) => this.removeServices.call(this, service)}></i>
									<h3 className={this.state.services === service ? 'button--active' : 'button'}>{service.service}</h3>
								</a>
							</div>
						)
					})}
				</section>
				<Link className="button button--next" to="/dashboard">NEXT</Link>
			</div>
		)
	}
}