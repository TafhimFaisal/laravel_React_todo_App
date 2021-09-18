import React, { Component } from 'react'
import axios from 'axios';

export default class SignUp extends Component {

    state = {
        email:"",
        password:""
    }


    handleChange = (e) => {
        e.preventDefault();
        let key = e.target.getAttribute('name')
        let value = e.target.value

        if(key == 'email'){
            this.setState({
               email : value
            })
        }
        
        if(key == 'password'){
            this.setState({
                password : value
            })
        }
    }

    handleRegistration = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/auth/signup?email='+this.state.email+'&password='+this.state.password).then((response)=>{
            document.cookie = `token=`+response.data.token.access_token
            this.props.history.push('/');
        }).catch((error)=>{
            console.error(error);
        })

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={this.handleRegistration}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input name="email" onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input name="password" onChange={this.handleChange} type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="btn btn-primary">SignUp</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
