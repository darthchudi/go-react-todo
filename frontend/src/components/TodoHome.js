import React from 'react';
import Nav from './Nav';
import TodoForm from './TodoForm';
import TodosContainer from './TodosContainer';

const TodoHome = (props) => (
	<div className="container">
		<Nav active="Home"/>
		<TodoForm handleChange={props.handleChange} newTodo={props.newTodo} createNewTodo={props.createNewTodo}/>
		<TodosContainer todos={props.todos} completeTodo={props.completeTodo} deleteTodo={props.deleteTodo}/>
	</div>
)

export default TodoHome;
