import React, { Component } from 'react'
import AddTodoForm from '../components/AddTodoForm'
import Todos from '../components/Todos'
import axios from 'axios';

export default class List extends Component {

    async componentDidMount(){

        var cookies = document.cookie.split("=")

        if( document.cookie.split("=")[0] != 'token' 
            || cookies[1] == 0 || cookies[1] == undefined){
            this.props.history.push('/login');
        }

        this.setState({token:document.cookie})
        
        try {
            let todos = await axios.get('http://127.0.0.1:8000/api/todo?'+document.cookie)
            this.setState({
                todos: todos.data.todos
            })
            console.log(todos.data.todos);
            return todos.data.todos
        } catch (error) {
            console.error(error);
            return null
        }
    }

    state = {
        todos:[],
        token:undefined,
        singleTodo:{
            id:undefined,
            name: undefined,
            description: undefined,
            deadline: undefined,
        }
    }

    getAllTodos = () => {
        axios.get('http://127.0.0.1:8000/api/todo?'+this.state.token).then((response)=>{
            this.setState({todos: response.data.todos})
        }).catch((response)=>{
            console.error(response);
        })
    }


    handleDelete = (todosId) => {
        axios.delete('http://127.0.0.1:8000/api/todo/'+todosId+"?"+this.state.token).then((response)=>{
            console.log(response);
            this.getAllTodos()
        }).catch((response)=>{
            console.error(response);
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let data ="?name="+this.state.singleTodo.name+"&description="+this.state.singleTodo.description+"&deadline="+this.state.singleTodo.deadline+"&"+this.state.token
        
        axios.post('http://127.0.0.1:8000/api/todo/'+data).then((response)=>{
            this.state.singleTodo.name = undefined
            this.state.singleTodo.description = undefined
            this.state.singleTodo.deadline = undefined
            this.getAllTodos()
        }).catch((response)=>{
            console.error(response);
        })
        
    }
    handleChange = (e) => {
        e.preventDefault()

        if(e.target.getAttribute('name') == 'name'){
            this.state.singleTodo.name = e.target.value
        }

        if(e.target.getAttribute('name') == 'description'){
            this.state.singleTodo.description = e.target.value
        }

        if(e.target.getAttribute('name') == 'deadline'){
            this.state.singleTodo.deadline = e.target.value
        }

        console.log(this.state.singleTodo);
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
                                        <input name="name" onChange={(e)=>{this.handleChange(e)}} value={this.state.singleTodo.name} type="text" className="form-control"  id="name" aria-describedby="emailHelp" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="deadline" className="form-label">deatline</label>
                                        <input name="deadline" onChange={(e)=>{this.handleChange(e)}} value={this.state.singleTodo.deadline} type="text" className="form-control" id="deadline" aria-describedby="emailHelp" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea onChange={(e)=>{this.handleChange(e)}} value={this.state.singleTodo.description} className="form-control" name="description" id="description" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                        
                        </div>
                        <div className="col-md-6">
                            <Todos todos={this.state.todos} handleDelete={this.handleDelete}/>
                        </div>
                    </div>
                </div>
        )
    }
}
