import React from 'react';
import Nav from './Nav';
const Uncompleted = (props) => (
	<div className="container">
		<Nav active="Uncompleted"/>
		<ul>
			{
				props.uncompletedTodos.map( (todo, key) => 
					<div className="card w-50 mx-auto mt-3" key={key}>
						<div className="card-body">
							<div style={props.descriptionStyle} className="pl-2"> 
								{todo.Description}
							</div>

							<div className="mx-auto text-center mt-3">
								<button className="btn btn-outline-success btn-sm w-25 mr-4" onClick={(e)=>props.completeTodo(todo, e)}> Complete </button>

								<button className="btn btn-outline-danger btn-sm w-25" onClick={(e)=>props.deleteTodo(todo, e)}> Delete </button>
							</div>
						</div>

						<div className="card-footer text-muted lead text-right" style={props.dateStyle}>
							{props.parseDate(todo.CreatedAt)}
						</div>
					</div>
				)
			}
		</ul>
  	</div>

)

export default Uncompleted;

