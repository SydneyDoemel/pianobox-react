import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../settings.css";
export default function Settings({user, logMeOut}) {
    const [message, setMessage]=useState(false)
    const [redirect, setRedirect]=useState(false)
    const changePassword = async (e) => {
        e.preventDefault();
        if (e.target.newpass.value !== e.target.confirmpass.value){ // making sure the password AND confirm password match
            setMessage(true)
            return
        }
        const res = await fetch('http://127.0.0.1:5000/api/changepass', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: e.target.newpass.value
            })
        });
        const data = await res.json();
        console.log(data)
        setRedirect(true)
        logMeOut();
    }
    const changeUsername = async (e) => {
            e.preventDefault();
            const res = await fetch('http://127.0.0.1:5000/api/changeusername', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.newusername.value
                })
            });
            const data = await res.json();
            console.log(data)
            setRedirect(true)
            logMeOut();
    };
    const changeEmail = async (e) => {
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:5000/api/changeemail', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: e.target.newemail.value
            })
        });
        const data = await res.json();
        console.log(data)
        setRedirect(true)
        logMeOut();}
    const deleteUser = async (e) => {
            e.preventDefault();
            const res = await fetch('http://127.0.0.1:5000/api/deleteuser', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: null
                })
            });
            const data = await res.json();
            console.log(data)
            setRedirect(true)
            logMeOut();
};
  return redirect ? <Navigate to="/login"/>:(
    <>
    <div className="settings-body ">
    <div className="card mx-auto">
    <h3 className="text-center card-header">Settings</h3>
    <div className="d-flex flex-column text-center settings-buttons card-body">
      <div className="">
        <button type="button" className="btn btn-outline-dark my-3 settings-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" >
          Change Username
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                Change Username
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
              </div>
              <div className="modal-body">
              <form onSubmit={(e)=>{changeUsername(e)}}>
            <label htmlFor="newusername" className="me-4">New Username</label>
            <input type="text" id="newusername" name="newusername" /><br /><br/>
            <input type="submit" className="btn btn-outline-dark" value="Submit"/>
            </form>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div>
        <button type="button" className="btn btn-outline-dark my-3 settings-btn" data-bs-toggle="modal" data-bs-target="#email" >
          Change Email
        </button>
        <div className="modal fade" id="email" tabIndex="-1" aria-labelledby="emailModalLabel" aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="emailModalLabel">
                Change Email
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
              </div>
              <div className="modal-body">
              <form onSubmit={(e)=>{changeEmail(e)}}>
            <label className="me-4" htmlFor="newemail">New Email</label>
            <input type="email" id="newemail" name="newemail" /><br /><br/>
            <input type="submit" className="btn btn-outline-dark" value="Submit"/>
            </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>



      <div>
      <div>
        <button type="button" className="btn btn-outline-dark my-3 settings-btn" data-bs-toggle="modal" data-bs-target="#password" >
          Change Password
        </button>
        <div className="modal fade" id="password" tabIndex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="passwordModalLabel">
                Change Password
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
              </div>
              <div className="modal-body">
              <form onSubmit={(e)=>{changePassword(e)}}>
            <label className="me-4" htmlFor="newpass">New Password</label>
            <input type="password" id="newpass" name="newpass" /><br /><br/>
            <label className="me-4" htmlFor="confirmpass">Confirm Password</label>
            <input type="password" id="confirmpass" name="confirmpass"/><br/><br/>
            <input type="submit" className="btn btn-outline-dark" value="Submit"/>
            </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>



      <div>
        <button type="button" className="btn btn-outline-dark my-3 settings-btn" data-bs-toggle="modal" data-bs-target="#newaccountModal" >
          Delete Account
        </button>
        <div className="modal fade" id="newaccountModal" tabIndex="-1" aria-labelledby="newaccountModalLabel" aria-hidden="true" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="newaccountModalLabel">
                  Modal title
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
              </div>
              <div className="modal-body">
              <form onSubmit={(e)=>{deleteUser(e)}}>
            <p>Are you sure you want to delete your account?</p>
            <input type="submit" className="btn btn-outline-danger" value="Delete"/>
            </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}
