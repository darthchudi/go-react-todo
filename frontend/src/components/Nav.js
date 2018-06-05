import React from 'react';
import {Link} from 'react-router-dom'

const Nav = ({active})=>(
	<div className="row">
		<div className="col">
			<ul className="nav nav-pills justify-content-center mt-2">
			  <li className="nav-item mr-2">
			    <Link className={`nav-link ${active==='Home' ? 'active' : ''}`} to="/">Home</Link>
			  </li>
			  <li className="nav-item">
			    <Link className={`nav-link ${active==='Completed' ? 'active' : ''}`} to="/completed">Completed</Link>
			  </li>
			  <li className="nav-item mr-2">
			    <Link className={`nav-link ${active==='Uncompleted' ? 'active' : ''}`} to="/uncompleted">Uncompleted</Link>
			  </li>
			</ul>
		</div>
	</div>

)

export default Nav;