import React from "react";
import "./App.css"

import logo from "./png_icon.png"

var KEY_googleDrive_FileLister = "lambda_GoogleDrive_FileLister"
var KEY_test_DadJoke = "lambda_DadJokeTest"
var KEY_test_Basic = "lambda_TestFunction"

var LambdaUIData = 
{
	KEY_googleDrive_FileLister: {
		buttonLabel: "Get Env Var"
	},
	KEY_test_DadJoke: {
		buttonLabel: "Get Dad Joke"
	},
	KEY_test_Basic: {
		buttonLabel: "Get Basic Test Response"
	}
}

//https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data

class AsyncTestButton extends React.Component 
{
	constructor(props) 
	{
		super(props);
		
		this.state = { 
			isLoading: false, 
			receivedMessage: null,
			key: props.key,
			clickHandler: props.clickHandler
		};
	}
	render() {
		return (
				<div>
				<button 
					onClick={(e)=>{this.state.clickHandler(e, this.state.key, null);}}
				>
					{this.state.isLoading ? "Loading..." : LambdaUIData[this.state.key].buttonLabel}
				</button>
				<span>{this.state.receivedMessage}</span>
			</div>
		);
	}
}

class LambdaDemo extends React.Component 
{
	constructor(props) 
	{
		super(props);
		
		this.state = { }
	}

	handleClick (event, key, data)
	{
		event.preventDefault()

		this.setState({ loading: true })
		fetch("/.netlify/functions/" + key, 
			{ 
				body: JSON.stringify(data),
				method: 'POST'
			})
			.then(response => response.json())
			.then(json => this.updateAsyncStatus(key, false, json.msg))
	}

	render() {

		return (
			<p>
				<AsyncTestButton 
					clickHandler={this.handleClick.bind()}
					key={KEY_googleDrive_FileLister}
				/>
				
				<AsyncTestButton 
					clickHandler={this.handleClick.bind()}
					key={KEY_test_DadJoke}
				/>
				
				<AsyncTestButton 
					clickHandler={this.handleClick.bind()}
					key={KEY_test_Basic}
				/>
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