import React from 'react';
import {Link} from 'react-router';


export default class setupTime extends React.Component {
	
	constructor() {
		super();
		this.state = {
			times: [],
			employees: [],
			currentEmployee: '',
			currentEmployeeName: '',
			currentTimeId: [],
			color: 'button'
		}
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			const currentUser = firebase.auth().currentUser;
			firebase.database().ref(`${currentUser.uid}/employees`)
				.on('value', (res) => {

					const employeeData = res.val();
					const dataArray = [];

					//loop over the employeeData
					for(let key in employeeData) {
	
						employeeData[key].key = key;
						dataArray.push(employeeData[key])
					}
					this.setState({
						employees: dataArray
					})
				})
		})
	}

	handleClick(target) {
		// const dataArray = target.classList;
		target.classList.toggle('button--active');
	}
	addTime(e) {
		e.preventDefault();

		//store the value on the input
		const time = this.createTime.value

		// console.log("TIME", time);
		const timeArray = [];
		const totalTimes = timeArray.push(time);
		//call FUNCTION and pass in the time value here

		const currentUser = firebase.auth().currentUser;
		const currentUserId = currentUser.uid;
		if(currentUser) {
			firebase.database().ref(`${currentUserId}/employees/${this.state.currentEmployee}/times`)
				//pushing single employee rather than the whole list
				.push(time);
		}


		// const moment = require('moment');
		// const blah = moment().format('MMMM Do YYYY, h:mm:ss a');
	}
	getEmployeeObj(employeeId) {
		//get that specific object from the employee from firebase
		//get that data from the employee that was clicked on
		let employeeInfo = [];
		const currentState = this.state.times;
		employeeInfo = currentState;
		employeeInfo.push(employeeId)

		this.setState({
			times: employeeInfo
		})

	}

	//GETS THE PERSON ID
	chooseEmployee(personId,e) {
		//Now that we have the employee
		//We want to somehow track that that is the one we selected

		//THIS FUNCTIONALITY WILL NOT BE IN HERE!
		//We need to save the employee key somehow
		const selectedEmployee = personId.key;
		const selectedEmployeeName = personId.name
		console.log('employee', selectedEmployee);

		console.log("person id", personId)

		this.setState({
			currentEmployee: selectedEmployee
		});

		this.setState({
			currentEmployeeName: selectedEmployeeName
		})

		// this.handleClick.call(this,e.target);


		//And reference that key(state) in another function.


	}
	removeTime(timeToRemove) {
		console.log("time to remove", timeToRemove.key);
		const testing = this.state.currentTimeId;
		// console.log("what is this?", testing)

		// timeToRemove.remove();
		const currentUser = firebase.auth().currentUser;
		//get the key that was clicked on
		//use the time to remove after we have found the key

		firebase.database().ref(`${currentUser.uid}/employees/${this.state.currentEmployee}/times/${timeToRemove.key}`).remove();

	}

	renderTime(times)  {
		const timesArray = [];
		const keyArray = [];
		const combo = [];

		for(let key in times) {
			timesArray.push({
				times: times[key],
				key: key
			})
			keyArray.push(key)
		}

		return (
			timesArray.map((item) => {
				return (
					<div>
						<i className="fa fa-minus" onClick={(e) => this.removeTime.call(this, item) }></i>
						<li>{item.times}</li>
					</div>
				)
			})
		
		)
	
	}
	render() {
		return (
			<div>
				<h2>Step 2: Set up available time for employees.</h2>
				<form onSubmit={(e) => this.addTime.call(this, e)}>
					<input type="text" ref={ref => this.createTime = ref} />
					<br/>

					<br/>
					<input className="button" type="submit" />
				</form>
				<section>
					{this.state.employees.map((item, i) => {
						const lala = this.state.currentEmployeeName
						console.log("lala", lala)
						return (
							<div>
								<section key={i}>
									<a href="#">
										<h3 className={this.state.currentEmployeeName === item.name ? 'button--active' : 'button' } onClick={(e) => this.chooseEmployee.call(this, item,e)}>{item.name}</h3>
									</a>
									<ul>
										{this.renderTime(item.times)}
									</ul>
								</section>
							</div>
						)
					})}
					<Link className="button button--next" to="/setupServices">NEXT</Link>
				</section>
			</div>
		)

	}
}