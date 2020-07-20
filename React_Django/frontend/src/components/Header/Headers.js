import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default class Headers extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand>
            <Link className="nav-link" to="/">
              React-Bootstrap
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <ul className="navbar-nav ml-auto mt-2">
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}
