import React from 'react';

export default (props,index) => (
	<div key={`note-${index}`} className="noteCard">
		<h4>{props.note.title}</h4>
		<p>{props.note.text}</p>
	</div>
);