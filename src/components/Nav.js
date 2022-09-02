import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">PianoBox</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/audiotry">Test</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/news">News</Link>
              </li> */}
           
            
             

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Shop
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/shop">Shop</Link></li>
                  <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                </ul>
              </li> */}

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Finstagram
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/posts/create">Create Post</Link></li>
                  <li><Link className="dropdown-item" to="/feed">Finstagram</Link></li>
                </ul>
              </li>
               */}
              {this.props.user.username ?
                <>
                <li className="nav-item">
                <Link className="nav-link" to="/piano">Piano</Link>
              </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hello, {this.props.user.username}
                </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                    <li className="dropdown-item" onClick={this.props.logMeOut}><Link className="nav-link" to="/login">Log Out</Link></li>
                  </ul>
                </li>
                  
              
                  
                </>
                :
                <>
                
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hello, Guest
                </a>
                  <ul className="dropdown-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                  </ul>
                </li>
                 
                 
                  
                </>
              }
            </ul>
          
          </div>
        </div>
      </nav>
    )
  }
}
