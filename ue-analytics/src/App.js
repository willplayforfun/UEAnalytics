import React from "react";
import "./App.css"

import logo from "./png_icon.png"


class LambdaDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loading: false, msg: null }
	}

	handleClick = api => e => {
		e.preventDefault()

		this.setState({ loading: true })
		fetch("/.netlify/functions/" + api)
			.then(response => response.json())
			.then(json => this.setState({ loading: false, msg: json.msg }))
	}

	render() {
		const { loading, msg } = this.state

		return (
			<p>
				<button onClick={this.handleClick("test_functions?name=Test")}>{loading ? "Loading..." : "Call Lambda"}</button>
				<button onClick={this.handleClick("test_async")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
				<br />
				<span>{msg}</span>
			</p>
		)
	}
}

class AnalyticsDashboard extends React.Component 
{
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Hello! Lambda test:
					</p>
					<LambdaDemo />
				</header>
			</div>
		);
	}
}

export default AnalyticsDashboard