import React, { Component } from 'react'
import axios from 'axios';

export default class Edit extends Component {

    async componentDidMount(){
        var cookies = document.cookie.split("=")
        if(cookies[1].length == 0){
            this.props.history.push('/login');
        }

        try {
            let id  = this.props.match.params.id;
            let todos = await axios.get('http://127.0.0.1:8000/api/todo/'+id+"?"+document.cookie)
            this.setState({
                id:todos.data.todo.id,
                name: todos.data.todo.name,
                description: todos.data.todo.description,
                deadline: todos.data.todo.deadline,
            })
        } catch (error) {
            console.error(error);
            return null
        }
    }

    state = {
        id:undefined,
        name: undefined,
        description: undefined,
        deadline: undefined,
    }

    handleSubmit = (e) => {

        e.preventDefault()
        
        let data =this.state.id+"?name="+this.state.name+"&description="+this.state.description+"&deadline="+this.state.deadline+"&"+document.cookie
        axios.put('http://127.0.0.1:8000/api/todo/'+data).then((response)=>{
            this.props.history.push('/');
        }).catch((response)=>{
            console.error(response);
        })

    }

    handleChange = (e) => {
        e.preventDefault()

        if(e.target.getAttribute('name') == 'name'){
            this.setState({
                name: e.target.value,
            })
        }

        if(e.target.getAttribute('name') == 'description'){
            this.setState({
                description: e.target.value,
            })
        }

        if(e.target.getAttribute('name') == 'deadline'){
            this.setState({
                deadline: e.target.value,
            })
        }

    }

    render() {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        
                        <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input name="name" onChange={(e)=>{this.handleChange(e)}} value={this.state.name} type="text" className="form-control"  id="name" aria-describedby="emailHelp" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="deadline" className="form-label">deatline</label>
                                        <input name="deadline" onChange={(e)=>{this.handleChange(e)}} value={this.state.deadline} type="text" className="form-control" id="deadline" aria-describedby="emailHelp" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea onChange={(e)=>{this.handleChange(e)}} value={this.state.description} className="form-control" name="description" id="description" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                        
                        </div>
                    </div>
                </div>
        )
    }
}
