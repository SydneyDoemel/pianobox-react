import React, { Component } from 'react'

import './App.css';
import Home from './views/Home'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter, Router } from 'react-router-dom'
import Login from './views/Login'
import SignUp from './views/SignUp'
import SynthTest from './views/SynthTest';
import SavedBlobs from './views/Profile';
import Profile from './views/Profile';
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Profile2 from './views/Profile2';
import Settings from './views/Settings';





export default function App() {

  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('user')
    if (foundUser){
      return JSON.parse(foundUser)
    }
    return {}
  };

  const [user, setUser] = useState(getUserFromLocalStorage())
  const logMeIn = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }
  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('user')
  }

  return (
    <BrowserRouter >
             <div className='app-body'>
               <Nav user={user} logMeOut={logMeOut}/>
          
               <Routes >
                 {/* <Route path='/' element={<Home user={user}/>}/> */}
                 <Route path='/login' element={<Login logMeIn={logMeIn}/>}/>
                 <Route path='/signup' element={<SignUp/>}/>
                 <Route path='/profile' element={<Profile2 user={user}/>}/>
                 <Route path='/' element={<SynthTest user={user}/>}/>
                 <Route path='/settings' element={<Settings logMeOut={logMeOut} user={user}/>} />
              
            
               </Routes>
               </div>
              <Footer />
             
           </BrowserRouter>
  )

}