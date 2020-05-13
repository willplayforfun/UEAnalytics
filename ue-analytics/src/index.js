import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AnalyticsDashboard extends React.Component 
{
	render() {
		return (
			<p>
			Hello
			</p>
		);
	}
}

ReactDOM.render(<AnalyticsDashboard />, document.getElementById('root'));

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
