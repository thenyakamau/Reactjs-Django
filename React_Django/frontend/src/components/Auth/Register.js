import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      cPassword: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, email, password, cPassword } = this.state;
    console.log(`${username}  ${email}  ${password}  ${cPassword}`);
  }

  render() {
    const { username, email, password, cPassword } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>UserName</label>
              <input
                type="text"
                name="username"
                onChange={this.onChange}
                value={username}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={this.onChange}
                value={email}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.onChange}
                value={password}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="cPassword"
                onChange={this.onChange}
                value={cPassword}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <center>
                <button className="btn btn-lg btn-primary" type="submit">
                  Register
                </button>
              </center>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
