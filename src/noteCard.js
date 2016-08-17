import React from 'react';

export default class NoteCard extends React.Component { 
	constructor() {
		super();
		this.state = {
			editing: false,
			note: {}
		};
	}
	componentDidMount() {
		this.setState({
			note: this.props.note
		});
	}
	edit() {
		this.setState({
			editing: true
		});
	}
	changeHandler(e) {
		const newObj = Object.assign({},this.state.note,{
			[e.target.name]: e.target.value
		});
		this.setState({
			note: newObj 
		});
	}
	save(e) {
		e.preventDefault();
		const currentUser = firebase.auth().currentUser.uid;
		const objRef = firebase.database().ref(`users/${currentUser}/notes/${this.state.note.key}`);
		objRef.update({
			title: this.state.note.title,
			text: this.state.note.text
		});
		this.setState({
			editing: false
		});
	}
	render() {
		let editTemp = (
			<span>
				<h4>{this.state.note.title}</h4>
				<p>{this.state.note.text}</p>
			</span>
		);
		if(this.state.editing) {
			editTemp = (
				<form onSubmit={e => this.save.call(this,e)}>
					<div>
						<input type="text" defaultValue={this.state.note.title} onChange={this.changeHandler.bind(this)} name="title"/>
					</div>
					<div>
						<textarea name="text" id="" defaultValue={this.state.note.text} onChange={this.changeHandler.bind(this)}></textarea>
					</div>
					<input type="submit"/>
				</form>
			)		
		}

		return (
			<div className="noteCard">
				<div className="fa fa-edit" onClick={e => this.edit.call(this)}></div>
				<i className="fa fa-times" onClick={e => this.props.removeNote.call(null,this.props.note.key)}></i>
				{editTemp}
			</div>
		);
	}
};