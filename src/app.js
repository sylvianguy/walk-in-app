import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
	render() {
		return (
			<div>
				<h2>Hi</h2>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));