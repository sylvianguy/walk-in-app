import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './noteCard.js';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			notes: []
		};
	}
	toggleAddNote(e) {
		e.preventDefault();
		this.sidebar.classList.toggle('show');
	}
	addNew(e) {
		e.preventDefault();
		const newNote = {
			title: this.noteTitle.value,
			text: this.noteText.value
		};
		const newState = Array.from(this.state.notes);
		newState.push(newNote);
		this.setState({
			notes: newState
		});
		this.noteTitle.value = '';
		this.noteText.value = '';
		this.sidebar.classList.toggle('show');
	}
	render() {
		return (
			<div>
				<header className="mainHeader">
					<h1>Noted</h1>
					<a href="" onClick={(e) => this.toggleAddNote.call(this,e)}>Add New</a>
				</header>
				<section className="notes">
					{this.state.notes.map((note,i) => <NoteCard note={note} key={i}/>)}
				</section>
				<aside ref={ref => this.sidebar = ref} className="sidebar">
					<h3>Add new note</h3>
					<form onSubmit={(e) => this.addNew.call(this,e)}>
						<i className="fa fa-times" onClick={(e) => this.toggleAddNote.call(this,e)}></i>
						<input type="text" name="note-title" ref={ref => this.noteTitle = ref}/>
						<textarea name="note-text" ref={ref => this.noteText = ref}></textarea>
						<input type="submit"/>
					</form>
				</aside>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));