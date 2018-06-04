import React, { Component } from 'react';
import Nav from './components/Nav';
import TodoForm from './components/TodoForm';
import axios from 'axios';
import logo from './logo.svg';
import './css/bootstrap/dist/css/bootstrap.min.css';
import './css/todo.css';


class App extends Component {
	
	componentDidMount(){
		axios.get('/api/fetch')
		.then((data)=>{
			console.log(data)
		})
		.catch((e)=>{
			console.log(e.response)
		})
	}

	render() {
		return (
		  <div className="container">
			<Nav/>
			<TodoForm/>
		  </div>
		);
	}
}

export default App;
