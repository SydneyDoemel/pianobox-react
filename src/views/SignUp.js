import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

import '../App.css';

export default class SignUp extends Component {
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
                    Passwords do not match.
              </div></>
            )
        }
    }
    sendSignUpInfo = async (e) => {
        e.preventDefault();
        

        if (e.target.password.value !== e.target.confirmPassword.value){ // making sure the password AND confirm password match
            this.setState({message: true})
            return
        }

        const res = await fetch('http://127.0.0.1:5000/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
        });
        const data = await res.json();
        console.log(data)
        this.setState({redirect: true})
        
    };
    
    render() {
        return this.state.redirect ? <Navigate to="/login"/>:
        (
            <div className='container'>
            <form className='col-md-6 mx-auto' onSubmit={(e)=>{this.sendSignUpInfo(e)}}>
            <h1 className='row text-center mx-auto mb-5 mt-5'>Sign Up</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username'/>
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email'/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" id="confirm_pass" className="form-control" name='confirmPassword'/>
                </div>
                
                <button type="submit" className="btn btn-outline-dark">Submit</button><br/>
                
            </form>
            
            <><p className="mt-5 text-center">Already have an account? <Link to='/login'>Log In</Link></p></>
            <>{this.message()}</>
            </div>
        )
    }
}
