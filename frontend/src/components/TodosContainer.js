import React from 'react';
import Todo from './Todo';

const TodosContainer = (props) => (
	<ul>
		{
			props.todos.map( (todo, key) => <Todo key={key} todo={todo} completeTodo={props.completeTodo} deleteTodo={props.deleteTodo} /> )
		}
	</ul>
)

export default TodosContainer