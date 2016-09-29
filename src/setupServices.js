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
					const allDataArray = [];

					for(let key in allData) {
						allDataArray.push(allData[key])
						
					}

					this.setState({
						services: allDataArray
					})

				})
		})
	}

	removeServices(serviceToRemove) {
		console.log(serviceToRemove)
	}

	addServices(e) {
		e.preventDefault();
		const inputValue = this.createService.value;
		console.log("service", inputValue);
		//get the currentstate
		const currentState = this.state.services
		currentState.push(inputValue);
		console.log("curr", currentState);

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
						console.log("surv", service)
						return (
							<div key={i}>
								<a href="#">
									<h3 className={this.state.services === service ? 'button--active' : 'button'}>{service}</h3>
								</a>
							</div>
						)
					})}
				</section>
			</div>
		)
	}
}