import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    
    return (
        <ul className="nav container">
          <li className="nav-item">
            <Link to="/" className="nav-link" href="#">Todo List</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" href="#">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link" href="#">LogOut</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" href="#">SignUp</Link>
          </li>
        </ul>
    )
}
