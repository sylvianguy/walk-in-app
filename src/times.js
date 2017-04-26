import React from 'react';
import {Link} from 'react-router';

export default class Times extends React.Component {
	constructor() {
		super();
		this.state = {
			getStartTime: '',
			getEndTime: '',
			timeSlots: [],
			currentTimeSlots: []
		}
		this.increment = this.increment.bind(this);
		this.getStartTime = this.getStartTime.bind(this);
		this.getEndTime = this.getEndTime.bind(this);
		this.renderTimes = this.renderTimes.bind(this);
		this.addTimes = this.addTimes.bind(this);
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			const theCurrentUser = firebase.auth().currentUser;
			const currentUserId = theCurrentUser.uid;
			console.log(currentUserId)
				firebase.database().ref(`${theCurrentUser.uid}/times`)
					.on('value', (res) => {
						const results = res.val();
						console.log("ressssss", results);
							this.setState({
								currentTimeSlots: results
							})
					})

			
		});
		function call(pagenum) {
		    return $.ajax
		}

		const arrayOfCalls = []

		for(i = 0; i < 4; i++) {
		    arrayOfCalls.push(call(25))
		}

		Promise.All(arrayOfCalls)
		    .then(res => {
		        console.log(res);
		    })


		// firebase.auth().onAuthStateChanged((user) => {
		// 	firebase.database().ref(`${theCurrentUser.uid}/employees`)
		// 		.on('value', (res) => {
		// 			console.log("ssss", res.val())
		// 			// const times = res.val();
		// 			// const timesArray = Object.keys(times);
		// 			// console.log("key",times[timesArray])
		// 			// this.setState({
		// 			// 	currentTimeSlots: times[timesArray]
		// 			// })
		// 			// times.timesArray
					

		// 		})
		// })	
	}



	addTimes(e) {
		e.preventDefault();
		// console.log("lala", this.state.timeSlots)
		const currentUser = firebase.auth().currentUser;

		//when you add times
		console.log("CURRE", this.state.currentTimeSlots)
		//remove times in database 
		//add times in database


		if(currentUser) {
			firebase.database().ref(`${currentUser.uid}/times`)

				.set(this.state.timeSlots)
		}
	}
	getStartTime(e) {
		console.log("this working?")
		const startTime = parseInt(e.target.value)
		this.setState({
			getStartTime: startTime
		})
	}
	getEndTime(e) {
		const endTime = parseInt(e.target.value);
		this.setState({
			getEndTime: endTime
		})
	}

	increment(e) {
		let incrementBy = parseInt(e.target.value);
		console.log("lalalla", incrementBy)
		let startTime = this.state.getStartTime;
		const endTime = this.state.getEndTime;
		const times = [];
		var ap = ['AM', 'PM']

		//get the start and end number i.e 10:00am - 9:00pm
		let done = true;
		let i = 0;
		let startMin = 0;
		let hour = startTime;
		while(done) {
			startMin = startMin + incrementBy;
			if(startMin >= 60) {
				startMin = 0;
				hour++;
			}

			times[i] = ('0' + hour)  + ':' + (startMin === 0 ? "00" : startMin);
			if(hour >= endTime) {
				done = false;
			}
			i++;
		}
		this.setState({
			timeSlots: times
		})

		this.renderTimes();

	}

	renderTimes() {
	
		if(this.state.timeSlots !== '') {
			return this.state.currentTimeSlots.map((item, i) => {
				console.log("the time")
				return <li key={i} className="timesGrid__single">{item}</li>
			})
		}
	}

	render(){
		let saveBtn = (<input className="button button--next" type="submit" value="Save" />)
		return (
			<div>
				
				<form onSubmit={this.addTimes} className="dashboard wrapper">
				<div className="form--option three--col">
						<label defaultValue="default" className="sml--col">
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<select onChange={this.getStartTime}>
								<option value="1">1:00</option>
								<option value="2">2:00</option>
								<option value="3">3:00</option>
								<option value="4">4:00</option>
								<option value="5">5:00</option>
								<option value="6">6:00</option>
								<option value="7">7:00</option>
								<option value="8">8:00</option>
								<option value="9">9:00</option>
								<option value="10">10:00</option>
							</select>
						</label>
						<label defaultValue="default" className="sml--col">
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<select onChange={this.getEndTime}>
								<option value="1">1:00</option>
								<option value="2">2:00</option>
								<option value="3">3:00</option>
								<option value="4">4:00</option>
								<option value="5">5:00</option>
								<option value="6">6:00</option>
								<option value="7">7:00</option>
								<option value="8">8:00</option>
								<option value="9">9:00</option>
								<option value="10">10:00</option>
							</select>
						</label>
						<label defaultValue="default">
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<select onChange={this.increment}>
								<option value="30">Every half hour</option>
								<option value="15">Every 15 mins</option>
								<option value="60">Every hour</option>
							</select>
						</label>
					</div>
					<h3 className="subheading">Available time slots:</h3>
					<ul className="timesGrid">
						{this.renderTimes()}
						
					</ul>
					<input className="button button--next" type="submit" value="Save" />
					<Link className="button button--next" to="/setup">Next</Link>
				</form>
			</div>
		)
	}
}