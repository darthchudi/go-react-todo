import React from 'react';

const TodoForm = (props) => (
	<div className="container">
		<div className="row mt-5">
			<div className="col">
				<form onSubmit={props.createNewTodo}>
					<div className="row justify-content-center">
						<div className="col-8 ml-2">
							<input type="text" className="form-control" placeholder="New Todo" value={props.newTodo} onChange={props.handleChange}/>
						</div>

						<div className="col-2">
							<button type="submit" className="btn btn-dark" disabled={props.newTodo === ''} onClick={props.createNewTodo}>Add</button>
						</div>
					</div>
				</form>
			</div>
		</div>	
	</div>

)

export default TodoForm;