import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";
export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid nav-ctnr">
          <a
            className="navbar-brand mx-4"
            href="/"
            style={{
              color: "rgb(255, 17, 61)",
              fontWeight: "bold",
              fontSize: "1.6rem",
            }}
          >
            PianoBox
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <BsList size={35} className="toggler" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {this.props.user.username ? (
                <>
                  <li className="nav-item ddi mx-2">
                    <Link
                      className="nav-link"
                      to="/profile"
                      style={{ color: "rgb(240, 241, 241)" }}
                    >
                      <p className="color-text">Library</p>
                    </Link>
                  </li>
                  <li className="nav-item piano-link">
                    <Link
                      className="nav-link active mx-2"
                      to="/settings"
                      style={{ color: "rgb(240, 241, 241)" }}
                    >
                      <p className="color-text">Settings</p>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>

            {this.props.user.username ? (
              <>
                <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown  ">
                    <a
                      className="nav-link dropdown-toggle greeting-btn"
                      href="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hello, {this.props.user.username} <span>..</span>
                    </a>
                    <ul className="dropdown-menu me-2">
                      <li
                        className="dropdown-item"
                        onClick={this.props.logMeOut}
                      >
                        <Link className="nav-link" to="/login">
                          <p className="color-text">Log Out</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item ">
                    <Link
                      className="nav-link login-btn"
                      to="/login"
                      style={{ color: "rgb(240, 241, 241)" }}
                    >
                      <p className="login-text">Login</p>
                    </Link>
                  </li>
                  <li className="nav-item  ms-lg-3">
                    <Link className="nav-link signup-btn" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
