import React, { Component } from 'react'

export default class Logout extends Component {
    componentDidMount(){
        let tokenname = 'token'
        document.cookie = tokenname +'=';
        this.props.history.push('/login');
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

