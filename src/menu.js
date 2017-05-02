import React from 'react';
import {Link} from 'react-router';

export default class Menu extends React.Component {
	render() {
		return (
			<div>
				<div className="addAppointment" onMouseEnter={this.props.showMenu} onMouseLeave={this.props.hideMenu} onClick={() => this.props.addAppointment()}><i className="fa fa-plus"></i></div>
				<div className="menu__container" onMouseEnter={this.props.showMenu} onMouseLeave={this.props.hideMenu}>
					<ul className={this.props.toggleMenu ? "menu show" : "menu hide"}>
						<li><Link to="/times"><i className="fa fa-clock-o"></i></Link></li>
						<li><Link to="/setup"><i className="fa fa-user-plus"></i></Link></li>
						<li><Link to="/services"><i className="fa fa-wrench"></i></Link></li>
					</ul>
				</div>
			</div>
		)
	}
}