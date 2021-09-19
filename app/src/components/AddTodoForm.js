import React from 'react'

export default function AddTodoForm({todo,handleUpdate,handleCreate,handleChange}) {
    
    return (
        <div>
            <form>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input onChange={(e)=>{handleChange(e)}} value={todo.name} type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" />
                        </div>
                        
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="deatline" className="form-label">deatline</label>
                            <input onChange={(e)=>{handleChange(e)}} value={todo.deatline} type="date" className="form-control" name="deatline" id="deatline" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea onChange={(e)=>{handleChange(e)}} value={todo.description} className="form-control" name="description" id="description" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}
