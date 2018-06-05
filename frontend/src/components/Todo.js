import React from 'react';
import moment from 'moment';

const descriptionStyle = {
	borderLeft: "4px solid black",
	fontFamily: "'HelveticaNeue-Bold'",
	fontSize: "1.1rem"
}

const dateStyle = {
	fontSize: "0.8rem",
	opacity: "0.6"
}

const parseDate = date =>{
	return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

const Todo = ({todo, completeTodo, deleteTodo}) => (
	<div className="card w-50 mx-auto mt-3">
		<div className="card-body">
			<div style={descriptionStyle} className="pl-2"> 
				{todo.Description}
			</div>

			<div className="mx-auto text-center mt-3">
				<button className="btn btn-outline-success btn-sm w-25 mr-4" onClick={(e)=>completeTodo(todo, e)}> Complete </button>

				<button className="btn btn-outline-danger btn-sm w-25" onClick={(e)=>deleteTodo(todo, e)}> Delete </button>

			</div>
		</div>

		<div className="card-footer text-muted lead text-right" style={dateStyle}>
			{parseDate(todo.CreatedAt)}
		</div>
	</div>
)

export default Todo;