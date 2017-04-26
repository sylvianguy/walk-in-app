import React from 'react';
import {Link} from 'react-router';

export default class Setup extends React.Component {

	constructor() {
		super();
		this.state = {
			employees: [],
			allTimeSlots: [],
			handleModal: false,
			employeeKey: '',
		}
		this.handleModal = this.handleModal.bind(this);
		this.displayModal = this.displayModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.addTime = this.addTime.bind(this)
	}
	componentDidMount() {
		//whenever a value is a changed, tell us about it!
		firebase.auth().onAuthStateChanged((user) => {
			const theCurrentUser =  firebase.auth().currentUser;
			firebase.database().ref(`${theCurrentUser.uid}/employees`)
				.on('value', (res) => {
					const userData = res.val();
					const dataArray = [];

					for(let key in userData) {
						userData[key].key = key;
						dataArray.push(userData[key]);
					}
					this.setState({
						employees: dataArray
					})
				});

			firebase.database().ref(`${theCurrentUser.uid}/times`)
				.on('value', (res) => {
					console.log("value", res.val())
					this.setState({
						allTimeSlots: res.val()
					})
				})
		});
	}

	handleModal(employee) {
		this.setState({
			handleModal: true,
			employeeKey: employee.key
		})
	}

	closeModal() {
		this.setState({
			handleModal: false
		})
	}

	addTime(value) {
		console.log(value)
		const employeeKey = this.state.employeeKey
		const currentUser = firebase.auth().currentUser;
		const currentUserId = currentUser.uid;
		if(currentUser) {
			firebase.database().ref(`${currentUserId}/employees/${employeeKey}/times`)
				.push({
					time: value,
					booked: false
				});
		}
	}

	displayModal() {
		const timeSlots = this.state.allTimeSlots;
	
		return (
			<div className={this.state.handleModal === true ? 'modal' : 'modal--close'}>
				<div className="modal__box">
					<i onClick={this.closeModal} className="fa fa-times" aria-hidden="true"></i>
					<ul className="timesGrid">
						{timeSlots.map((item, i) => {
							return <li key={`timeslot-${i}`} onClick={() => this.addTime(item)} className="timesGrid__single timesGrid__single--inactive">{item}</li>
						})}
					</ul>

				</div>
			</div>
		)
	
	}

	addEmployees(e) {
		e.preventDefault();

		const employee = {
			//create this after you have created the ref in input 
			name: this.createEmployee.value
		}
		//clear my input on submit
		this.createEmployee.value = "";
		let newEmployees = [];
		const employeeName =  employee.name;
		const currentState = this.state.employees;

		newEmployees =  currentState;
		const pushed = newEmployees.push(employeeName);
	
		this.setState({
			employees: newEmployees
		})

		const theCurrentUser = firebase.auth().currentUser
		const currentUserId = theCurrentUser.uid

		if(theCurrentUser) {
			firebase.database().ref(`${currentUserId}/employees`)
				//pushing single employee rather than the whole list
				.push(employee);
		}
	}
	removeEmployee(employeeToRemove) {
		const currentUser = firebase.auth().currentUser;
		firebase.database().ref(`${currentUser.uid}/employees/${employeeToRemove.key}`).remove();
	}
	render() {
		return (
			<div className="config__wrapper">
				<h2>Setup all of your stuff here</h2>
				<section className="selection">
					<form className="selection__duo" onSubmit={(e) => this.addEmployees.call(this, e)}>
						<i className="fa fa-plus" onClick={(e) => this.addEmployees.call(this, e)}></i>
						<input type='text' className="textInput" placeholder="Add employee" ref={ref => this.createEmployee =  ref}/>
					</form>
					<h3 className="subheading">Employees:</h3>
					{this.state.employees.map((employee, i) => {
						return (
							<div className="selection__block">
								<div className="selection__duo" key={`setup-${i}`} >
									<i className="fa fa-minus" onClick={(e) => this.removeEmployee.call(this, employee) }></i>
									<a href="#"><h3 className="button">{employee.name}</h3></a>
								</div>
								<div className="selection__duo">
										<i className="fa fa-plus"></i>
									<a href='#'>
										<h3 className="button addTime" onClick={() => this.handleModal(employee)}>Add time</h3>
									</a>
								</div>
							</div>
						)
					})}
					<div>{this.displayModal()}</div>
				</section>
				<Link className="button button--next" to="/setupTime">NEXT</Link>
			</div>
		)
	}
}