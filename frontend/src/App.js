import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Completed from './components/Completed';
import UnCompleted from './components/Uncompleted';
import TodoHome from './components/TodoHome';
import './css/bootstrap/dist/css/bootstrap.min.css';
import './css/todo.css';

class App extends Component {
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.createNewTodo = this.createNewTodo.bind(this)
		this.completeTodo = this.completeTodo.bind(this)
		this.deleteTodo = this.deleteTodo.bind(this)
		this.parseDate = this.parseDate.bind(this)
		this.state = {
			newTodo : '',
			positiveAlert: '',
			allTodos : [],
			uncompletedTodos: [],
			completedTodos: []
		}
	}

	componentDidMount(){
		console.log("heyy")
		axios.get("api/fetch")
		.then(({data})=>{
			var allTodos = data.allTodos
			var completedTodos = data.completedTodos
			var uncompletedTodos = data.uncompletedTodos

			this.setState({
				allTodos, completedTodos, uncompletedTodos
			})
		})
		.catch((e)=>{
			console.log(e)
		})
	}

	descriptionStyle = {
		borderLeft: "4px solid black",
		fontFamily: "'HelveticaNeue-Bold'",
		fontSize: "1.1rem"
	}

	dateStyle = {
		fontSize: "0.8rem",
		opacity: "0.6"
	}

	parseDate(date){
		return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
	}

	handleChange(e){
		var newTodo = e.target.value;
		this.setState({newTodo})
	}

	createNewTodo(e){
		e.preventDefault();

		if(this.state.newTodo === ''){
			return;
		}

		axios.post("api/create", {
			Description: this.state.newTodo
		})
		.then(({data})=>{
			var positiveAlert = `Successfully created ${data.todo.Description}`
			var uncompletedTodos = data.uncompletedTodos.reverse();

			this.setState(
				{
					newTodo: '',
					positiveAlert,
					allTodos: data.allTodos,
					uncompletedTodos
				}
			)
			console.log(data)
		})
		.catch((error)=>{
			console.log(error.response)
		})
	}

	completeTodo(todo, e){
		e.preventDefault();
		axios.post(`/api/complete/${todo.ID}`)
		.then(({data})=>{
			var completedTodos = data.completedTodos.reverse()
			var uncompletedTodos = data.uncompletedTodos.reverse()

			this.setState({completedTodos, uncompletedTodos})
			console.log(data)
		})
		.catch(({response: error})=>{
			console.log(error)
		});
	}

	deleteTodo(todo, e){
		e.preventDefault();
		axios.post(`/api/delete/${todo.ID}`)
		.then(({data})=>{
			var completedTodos = data.completedTodos.reverse()
			var uncompletedTodos = data.uncompletedTodos.reverse()
			this.setState({completedTodos, uncompletedTodos})
		})
		.catch(e=>{
			console.log(e.response)
		});
	}

	render() {
		return (
			<HashRouter>
				<div>
					
					<Route 
						exact path="/" 
						render={ 
							() => <TodoHome handleChange={this.handleChange} newTodo={this.state.newTodo} createNewTodo={this.createNewTodo} todos={this.state.uncompletedTodos} completeTodo={this.completeTodo} deleteTodo={this.deleteTodo} /> 
						}
					/>

					<Route
						exact path="/completed"
						render= {
							() => <Completed completedTodos={this.state.completedTodos} descriptionStyle={this.descriptionStyle} dateStyle={this.dateStyle} parseDate={this.parseDate} deleteTodo={this.deleteTodo}/>
						}
					/>

					<Route
						exact path="/uncompleted"
						render= {
							() => <UnCompleted uncompletedTodos={this.state.uncompletedTodos} descriptionStyle={this.descriptionStyle} dateStyle={this.dateStyle} parseDate={this.parseDate} completeTodo={this.completeTodo}  deleteTodo={this.deleteTodo}/>
						}
					/>
				</div>
			</HashRouter>
		);
	}
}

export default App;
