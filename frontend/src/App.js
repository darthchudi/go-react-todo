import React, { Component } from 'react';
import Nav from './components/Nav';
import TodoForm from './components/TodoForm';
import TodosContainer from './components/TodosContainer';
import axios from 'axios';
import './css/bootstrap/dist/css/bootstrap.min.css';
import './css/todo.css';

class App extends Component {
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.createNewTodo = this.createNewTodo.bind(this)
		this.completeTodo = this.completeTodo.bind(this)
		this.deleteTodo = this.deleteTodo.bind(this)
		this.state = {
			newTodo : '',
			positiveAlert: '',
			allTodos : [],
			uncompletedTodos: [],
			completedTodos: []
		}
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

	render() {
		return (
		  <div className="container">
			<Nav/>
			<TodoForm handleChange={this.handleChange} newTodo={this.state.newTodo} createNewTodo={this.createNewTodo}/>
			<TodosContainer todos={this.state.uncompletedTodos} completeTodo={this.completeTodo} deleteTodo={this.deleteTodo}/>
		  </div>
		);
	}
}

export default App;
