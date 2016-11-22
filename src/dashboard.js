import React from 'react';
import {Link} from 'react-router';

export default class Dashboard extends React.Component {

	constructor() {
		super();
		this.state = {
			currentUser: '',
			currentUserId: '',
			customerName: [],
			selectedObj: [],
			stylists: [],
			selectedStylist: [],
			stylistTimes: {},
			services: [],
			chosenTime: "",
			service: "",
			justTimes: []
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			const theCurrentUser = firebase.auth().currentUser;
			const currentUserId = theCurrentUser.uid;
			this.setState({
				currentUser: theCurrentUser,
				currentUserId
			})

			firebase.database().ref(`${theCurrentUser.uid}/employees`)
				.on('value', (res) => {
					const userData = res.val();
					// console.log("current", userData);
					const dataArray = [];
					const bookingTime = [];

					for(let key in userData) {
						const timesObj = userData[key].times;
						dataArray.push({
							key: key,
							name: userData[key].name,
							times: userData[key].times
						})
					}

					this.setState({
						stylists: dataArray,
						justTimes: bookingTime
					})

				}),
			firebase.database().ref(`${theCurrentUser.uid}/services`)
				.on('value', (res) => {
					const servicesArray = []
					const servicesData = res.val();

					for(let key in servicesData) {
						servicesArray.push({
							key: key,
							serviceName: servicesData[key]
						})
						
					}
					console.log("lala", servicesData);

					this.setState({
						services: servicesArray
					})	

				})		

		})
	}

	getCustomerName(e) {
		e.preventDefault();

		//get customer's name
		const customerName = {
			name: this.createCustomer.value
		}

		this.setState({
			customerName: customerName.name
		})

		const stylistInfo = this.state.stylists;
		this.bookAppointment();

	//save customer's name under stylist

	}

	bookAppointment() {
		const selectedObj = this.state.selectedObj
		const currentUser = this.state.currentUser;
		const currentUserId = this.state.currentUserId;
		const chosenTime = this.state.chosenTime;
		const customerName = this.state.customerName;
		const notes = this.createNote.value;
		const service = this.state.service;

		console.log("chosen time",service)
			if(currentUser) {
				firebase.database().ref(`${currentUserId}/employees/${selectedObj.key}/times/${chosenTime}/bookingInfo`).set({
					customerName: customerName,
					service: service,
					notes: notes
				});
			}

			if(currentUser) {
				firebase.database().ref(`${currentUserId}/employees/${selectedObj.key}/times/${chosenTime}`).update({
					booked:true
				});
			}
	
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
		this.setState({
			selectedStylist: stylistName,
			stylistTimes: filteredStylist.times,
			selectedObj: filteredStylist
		});
		// console.log("name", filteredStylist.times)

	}

	renderTimes() {
		const times = this.state.stylistTimes
		const timesArray = []
		for(let key in times) {
			timesArray.push({
				key: key,
				time: times[key]
			})	
		}
		return (
			timesArray.map((time, i) => {

				return <option key={i}>{time.time.time}</option>
			})
		)
	}

	chooseTime() {
		const time = this.selectedTimes.value;
		const stylistList = this.state.stylistTimes;
		const timesArray = [];

		for(let key in stylistList) {
			timesArray.push({
				key: key,
				time: stylistList[key]
			})
		}
		let filteredTime = timesArray.filter((item) => {
			return item.time.time === time;
		})


		this.setState({
			chosenTime: filteredTime[0].key,
		})

	}

	getServices() {
	//get list of services from firebase
		const services = this.state.services;

		this.setState({
			service: this.selectedService.value
		})
	}

	getTimes() {
		const allTimes = this.state.stylists

		return (
			allTimes.map((time) => {
				// console.log("time", time)
				const timesArray = [];
				for(let key in time.times) {
					timesArray.push(time.times[key].time);
				}
				return (
					<div className="appointment__schedule">
						<h3>{time.name}</h3>
						<ul>
						{timesArray.map((single) => {
							return (
								<li><a>{single}</a></li>
							)
						})}
						</ul>
					</div>
				)
			})
		)

	}


	saveNote() {
	//get value from input textarea
	//save note to the firebase
		
	}


	render() {
		return (
			<div>
				<form className="dashboard wrapper" onSubmit={(e) => this.getCustomerName.call(this, e)}>
					<div className="form--option">
						<label>
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<input placeholder="Customer's name" type="text" ref={ref => this.createCustomer = ref} />
						</label>
						<label>
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<select onChange={(e) => this.getAvailability.call(this)} ref={ref => this.selectedStylist = ref} >
								<option selected>Select a stylist</option>
								{this.state.stylists.map((item, i) => {
									// console.log(item.name)
									return (
										<option key={i}>{item.name}</option>
									)
								})}
							</select>
						</label>
						<label>
							<i className="fa fa-cogs" aria-hidden="true"></i>
							<select onChange={() => this.getServices.call(this)} ref={ref => this.selectedService = ref}>
								{this.state.services.map((item, i) => {
									return (
										<option key={i}>{item.serviceName}</option>
									)
								})}
							</select>
						</label>
						<input className="button button--next button--submit" type="submit" value="Book it" />
					</div>
					<div className="form--option">
						<label>
							<i className="fa fa-clock-o" aria-hidden="true"></i>
							<select onChange={() => this.chooseTime.call(this)} ref={ref => this.selectedTimes = ref}>
								<option selected>Select a time</option>
								{this.renderTimes()}	
							</select>
						</label>
						<p>Additional Notes</p>
						<textarea type="text" ref={ref => this.createNote = ref} />
					</div>
				</form>
				<section className="appointment">
					<div className="wrapper">
						<h2>Appointment Schedule</h2>
						{this.getTimes()}
					</div>
				</section>
			</div>
		)

	}
}