import React from 'react';

const TodoForm = ()=>(
	<div className="container">
		<div className="row mt-5">
			<div className="col">
				<form className="">
					<div className="row justify-content-center">
						<div className="col-8 ml-2">
							<input type="text" className="form-control" placeholder="New Todo" value={this.props.newTodo} onChange={this.props.handleChange}/>
						</div>

						<div className="col-2">
							<button type="submit" className="btn btn-dark">Add</button>
						</div>
					</div>
				</form>
			</div>
		</div>	
	</div>

)

export default TodoForm;