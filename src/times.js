import React from 'react';
import {Link} from 'react-router';

export default class Times extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}

	render(){
		return (
			<div>
				
				<form className="dashboard wrapper">
				<div className="form--option three--col">
						<label defaultValue="default" className="sml--col">
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<select>
								<option value="default">10:00am</option>
								<option>option 1</option>
							</select>
						</label>
						<label defaultValue="default" className="sml--col">
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<select>
								<option value="default">9:00pm</option>
								<option>option 1</option>
							</select>
						</label>
						<label defaultValue="default">
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve"><g><path d="M50,10.221c-11.05,0-20.039,8.989-20.039,20.039S38.95,50.299,50,50.299S70.04,41.31,70.04,30.26S61.05,10.221,50,10.221   L50,10.221z"/><path d="M49.999,55.055c-19.351,0-35.094,15.743-35.094,35.094h70.189C85.095,70.798,69.351,55.055,49.999,55.055z"/></g></svg>
							<select>
								<option value="default">Every 30 mins</option>
								<option>30</option>
							</select>
						</label>
					</div>
					<h3 className="subheading">Available time slots:</h3>
					<ul className="timesGrid">
						<li className="timesGrid__single">10:00</li>
					</ul>	
				</form>
			</div>
		)
	}
}