import React from 'react';
import {Link} from 'react-router';
import SweetAlert from 'react-bootstrap-sweetalert';
// import {}

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
			bookingInfo: [],
			removeModal: false,
			personId: "",
			alert: null
		}
		this.customerName = this.customerName.bind(this)
		this.bookAppointment = this.bookAppointment.bind(this)
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
					// console.log("lala", servicesData);

					this.setState({
						services: servicesArray
					})

				})

		})
	}

	customerName(e) {
		console.log(e.target.value);
		this.setState({
			customerName: e.target.value
		})
	}

	// getCustomerName(e) {
	// 	e.preventDefault();

	// 	//get customer's name
	// 	const customerName = {
	// 		name: this.createCustomer.value
	// 	}

	// 	this.setState({
	// 		customerName: customerName.name
	// 	})

	// 	const stylistInfo = this.state.stylists;
	// 	// this.bookAppointment();

	// //save customer's name under stylist

	// }
	removeAppointment(removedInfo) {
		const stylists = this.state.stylists;
		const currentUser = this.state.currentUser;
		const currentUserId = this.state.currentUserId;

		if(currentUser) {
			firebase.database().ref(`${currentUserId}/employees/${this.state.personId}/times/${removedInfo.key}/bookingInfo`).remove();
		}

		if(currentUser) {
				firebase.database().ref(`${currentUserId}/employees/${this.state.personId}/times/${removedInfo.key}`).update({
					booked: false
				});
			}

		this.setState({
			removeModal: true
		})
	}

	bookAppointment(e) {
		e.preventDefault();
		const selectedObj = this.state.selectedObj
		const currentUser = this.state.currentUser;
		const currentUserId = this.state.currentUserId;
		const chosenTime = this.state.chosenTime;
		const customerName = this.state.customerName;
		const notes = this.createNote.value;
		const service = this.state.service;

		// console.log("chosen time",service)
			if(currentUser) {
				firebase.database().ref(`${currentUserId}/employees/${selectedObj.key}/times/${chosenTime}/bookingInfo`).set({
					customerName,
					service,
					notes
				});
			}

			if(currentUser) {
				firebase.database().ref(`${currentUserId}/employees/${selectedObj.key}/times/${chosenTime}`).update({
					booked:true
				});
			}
	
	}

	getAvailability() {
		const stylistName = {
			name: this.selectedStylist.value
		}
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
				if(time.time.booked !== true) {
					return <option key={`bookingtime-${i}`}>{time.time.time}</option>
					
				}
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
			chosenTime: filteredTime[0].key
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
					// console.log("what", time)
				const timesArray = [];
				for(let key in time.times) {
					//ONLY display time if it is booked
					if( time.times[key].booked !== false) {
						timesArray.push(time.times[key].time);
					}
				}
				return (
					<div className="appointment__schedule">
						<h3>{time.name}</h3>
						<ul>
							{timesArray.map((single, i) => {
								return (
									//passing THIS in this function bounds this to
									//the dashboard
									<li key={`time-${i}`} onClick={(e) => this.bookingModal.call(this,e,time, single)}><a>{single}</a></li>
								)
							})}
						</ul>
					</div>
				)	
			})
		)

	}

	displayModal() {
		const bookingInfo = this.state.bookingInfo
		const allTimes = this.state.stylists
		const info = bookingInfo[0];
		const bookingArray = [];
		if(info) {
			// console.log('displaymodal', info.service)
			return (
				<div className={this.state.removeModal === true ? 'modal--close' : 'modal'}>
					<div className="modal__box">
						<i onClick={(e) => this.closeModal.call(this)} className="fa fa-times" aria-hidden="true"></i>
						<h3>Stylist: <span>{info.stylistName}</span></h3>
						<h3>Time: <span>{info.time}</span></h3>
						<h3>Client Name: <span>{info.clientName}</span></h3>
						<h3>Service: <span>{info.service}</span></h3>
						<h3>Notes: <span>{info.notes}</span></h3>
						<button className="button button--remove" onClick={(e) => this.removeAppointment.call(this, info)}>Remove</button>
					</div>
				</div>
			)
		}
		
		
	}

	closeModal() {
		this.setState({
			removeModal: true
		})
	}

	bookingModal(e,person,bookedTime) {
		console.log("hit booking modal", person, bookedTime)
		this.setState({
			removeModal: false,
			personId: person.key
		})
		const time = bookedTime;
		const stylistName = person.name;
		const bookedTimes = person.times
		const dataArray = [];

		for(let key in bookedTimes){
			// timesArray.push(bookedTimes[key].time)
			if (bookedTimes[key].time === time) {
				const bookingInfo = bookedTimes[key].bookingInfo;
				const customerName = bookingInfo.customerName;
				console.log("booking info", bookingInfo)
				dataArray.push({
					stylistName: stylistName,
					clientName: bookingInfo.customerName,
					service: bookingInfo.service,
					notes: bookingInfo.notes,
					time,
					key

				})

				
			}
		}
		this.setState({
			bookingInfo: dataArray
		})
	}

	sweetAlert() {
		console.log("hello");
		this.setState({
			alert: (<SweetAlert success title="Appointment Booked" onConfirm={() => this.hideAlert()}>
			Appointment booked!
			</SweetAlert>)
		});
			
	}
	hideAlert() {
	console.log('Hiding alert...');
		this.setState({
		  alert: null
		});
	}


	render() {
		return (
			<div>
				<form className="dashboard wrapper" onSubmit={(e) => this.bookAppointment(e)}>
					<div className="form--option">
						<label>
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<input placeholder="Customer's name" type="text" onChange={(e) => this.customerName(e)} required/>
						</label>
						<label>
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<select defaultValue="default" onChange={(e) => this.getAvailability.call(this)} ref={ref => this.selectedStylist = ref} >
								<option value="default">Select a stylist</option>
								{this.state.stylists.map((item, i) => {
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
						<input className="button button--next button--submit" type="submit" onClick={() => this.sweetAlert.call(this)} value="Book it"/>

					</div>
					<div className="form--option">
						<label>
							<i className="fa fa-clock-o" aria-hidden="true"></i>
							<select defaultValue="default" onChange={() => this.chooseTime.call(this)} ref={ref => this.selectedTimes = ref}>
								<option value="default">Select a time</option>
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
					<div>{this.displayModal()}</div>
					{this.state.alert}
				</section>
			</div>
		)

	}
}