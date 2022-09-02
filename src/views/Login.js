import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';

import '../App.css';

export default class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         redirect:false,
         message: false
      }
    }
 
    message = ()=>{
        if (this.state.message === true){
            
            return(
                <><div className="alert alert-danger" role="alert">
                    Incorrect username or password.
              </div></>
            )
        }
    }
  
    sendLoginInfo = async (e) => {
        e.preventDefault();
        
        const url = 'http://127.0.0.1:5000/api/login'

        const body = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)

        if (data.status === 'ok') {
            this.props.logMeIn(data.data)
        }
       
    };

    sendBasicAuth = async (e) => {
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:5000/token', {
            method: "POST",
            headers: {Authorization: `Bearer ${btoa(e.target.username.value+":"+e.target.password.value)}`}
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            this.props.logMeIn(data.data)
            this.setState({redirect: true})  
        }
       
    };

    render() {
        return this.state.redirect ? <Navigate to='/piano'/> :
        (
            <><div className='container'>
                
            <form className='col-md-6 mx-auto' onSubmit={(e) => { this.sendBasicAuth(e) }}>
            <h1 className='row text-center mx-auto mb-5 mt-5'>Log In</h1>
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username' />
                </div>


                <div className="mb-3 ">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' />
                </div>
              
                <button type="submit " className="btn btn-outline-dark">Submit</button>
            </form>
            <><p className="mt-5 text-center">Don't have an account? <Link to='/signup'>Sign Up</Link></p></>
            </div>
            {this.message()}
            </>
        )
    }
}
