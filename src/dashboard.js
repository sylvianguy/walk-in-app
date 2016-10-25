import React from 'react';
import {Link} from 'react-router';

export default class Dashboard extends React.Component {

	constructor() {
		super();
		this.state = {
			customerName: [],
			stylists: [],
			selectedStylist: [],
			stylistTimes: {},
			selectedTime: '',
			services: []
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			const theCurrentUser = firebase.auth().currentUser;
			// console.log(theCurrentUser);
			firebase.database().ref(`${theCurrentUser.uid}/employees`)
				.on('value', (res) => {
					const userData = res.val();
					const dataArray = [];

					for(let key in userData) {
						dataArray.push({
							name: userData[key].name,
							times: userData[key].times
						})

					}
					this.setState({
						stylists: dataArray
					})

				}),
			firebase.database().ref(`${theCurrentUser.uid}/services`)
				.on('value', (res) => {
					const servicesArray = []
					const servicesData = res.val();
					// console.log("services", res.val());
					for(let key in servicesData) {
						servicesArray.push({
							key: key,
							serviceName: servicesData[key]
						})
						
					}
						// console.log("key", servicesArray);
					this.setState({
						services: servicesArray
					})	

				})		

		})
	}

	componentWillUpdate() {

	}

	getCustomerName(e) {
		e.preventDefault();

		const customerName = {
			name: this.createCustomer.value
		}

		console.log(customerName.name);

		const dataArray = []
		

		this.setState({
			customerName: customerName.name
		})

	//get customer's name
	//save customer's name under stylist

	}

	renderStylists() {
	//get list employees names from firebase
		const stylists = this.state.stylists;
		return (
			stylists.map((stylist, i) => {
				// console.log(stylist)
				return (
					<option key={i}>{stylist.name}</option>
				)
			})
		)
	}

	getAvailability() {
		const stylistName = {
			name: this.selectedStylist.value
		}

		//figure out from the name the stylist times

		//filtering stylists ???
		let filteredStylist = this.state.stylists.filter((style) => {
			return style.name === stylistName.name;
		});

		filteredStylist = filteredStylist[0];

		console.log(filteredStylist);

		this.setState({
			selectedStylist: stylistName,
			stylistTimes: filteredStylist.times
		});

	}


	renderTimes() {
		const times = this.state.stylistTimes
		// console.log(times);
		const timesArray = []
		for(let key in times) {
			console.log("blah", times[key])
			timesArray.push(times[key])
		}

		return (
			timesArray.map((time, i) => {
				return <option key={i}>{time}</option>
			})
		)
	}

	chooseTime() {
		const time = this.selectedTimes.value;
		// console.log(time)

		// var selectTime = this.state.selectedTime;
		console.log(time)
	}

	getServices() {
	//get list of services from firebase
		const services = this.state.services;
		const selectedService = {
			service: this.selectedService.value
		}

		console.log(selectedService)

		console.log("services", services);

	}

	saveNote() {
	//get value from input textarea
	//save note to the firebase
		
	}


	render() {
		return (
			<div className="mainApp">
				<h2>Dashboard</h2>
				<form onSubmit={(e) => this.getCustomerName.call(this, e)}>
					<input type="text" ref={ref => this.createCustomer = ref} />
					<br/>
					<br/>
					<select onChange={(e) => this.getAvailability.call(this)} ref={ref => this.selectedStylist = ref} >
						<option selected>Select a stylist</option>
						{this.state.stylists.map((item, i) => {
							return (
								<option key={i}>{item.name}</option>
							)
						})}
					</select>
					<br/>
					<br/>
					<select onChange={() => this.chooseTime.call(this)} ref={ref => this.selectedTimes = ref}>
						{this.renderTimes()}	
					</select>
					<br/>
					<br/>
					<select onChange={() => this.getServices.call(this)} ref={ref => this.selectedService = ref}>
						{this.state.services.map((item, i) => {
							console.log(item)
							return (
								<option key={i}>{item.serviceName}</option>
							)
						})}
					</select>
					<br/>
					<br/>
					<textarea type="text" ref={ref => this.createNote = ref} />
					<br/>
					<input type="submit" />
				</form>
				<section>
					
				</section>
			</div>
		)





	}
}