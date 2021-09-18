import React from 'react'
import { Link } from 'react-router-dom'

export default function Todos({todos,handleDelete}) {
    let template = todos.length <= 0 ? ("no todos left") : (
        todos.map((todo)=>{
            return (
                <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{todo.name}</div>
                        {todo.description}<br/>
                        <small className="text-muted">
                            {todo.deadline}
                        </small> 
                    </div>
                    <Link to={"/todo/"+todo.id} className="btn btn-primary btn-sm ml-4">Edit</Link>
                    <button className="btn btn-primary btn-sm" onClick={ () =>{handleDelete(todo.id)}}>Delete</button>
                </li>
            )
        })
    )
    return (
        <div>
            <ol className="list-group list-group-numbered">
                {template}
            </ol>
            
        </div>
    )
}
