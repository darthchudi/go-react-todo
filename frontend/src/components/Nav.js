import React from 'react';

const Nav = ()=>(
	<div className="row">
		<div className="col">
			<ul className="nav nav-pills justify-content-center mt-2">
			  <li className="nav-item mr-2">
			    <a className="nav-link active" href="/">Home</a>
			  </li>
			  <li className="nav-item mr-2">
			    <a className="nav-link" href="/">Uncompleted</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/">Completed</a>
			  </li>
			</ul>
		</div>
	</div>

)

export default Nav;