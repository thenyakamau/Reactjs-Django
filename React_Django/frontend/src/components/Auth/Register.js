import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUser } from "../../Redux/actions/Auth";
import CustomSnackBar from "../widgets/CustomSnackBar";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      cPassword: "",
      openSnackBar: false,
      snackPosition: { vertical: "top", horizontal: "center" },
      responseMessage: "",
      isError: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired,
  };

  closeSnackBar() {
    this.setState({ openSnackBar: false });
  }

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;
    if (error !== prevProps.error) this.setResponse(error);
    else if (message !== prevProps.message) this.setResponse(message);
  }

  setResponse(response) {
    let value = Object.keys(response.responseMessage)[0];
    const responseMessage = response.responseMessage[value];
    if (responseMessage instanceof Array)
      this.setState({
        responseMessage: responseMessage[0],
        isError: response.isError,
        openSnackBar: true,
      });
    else
      this.setState({
        responseMessage: responseMessage,
        isError: response.isError,
        openSnackBar: true,
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, email, password, cPassword } = this.state;
    if (username && email && password && password === cPassword) {
      this.props.createUser(username, email, password);
    } else if (password !== cPassword) {
      this.setResponse({
        responseMessage: { response: "Passwords do not match" },
        isError: true,
      });
    } else {
      this.setResponse({
        responseMessage: { response: "Please input all fields" },
        isError: true,
      });
    }
  }

  render() {
    const {
      username,
      email,
      password,
      cPassword,
      openSnackBar,
      snackPosition,
      responseMessage,
      isError,
    } = this.state;
    const snackValues = {
      isError,
      responseMessage,
      openSnackBar,
      snackPosition,
    };

    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
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
        <CustomSnackBar
          values={snackValues}
          closeSnackBar={this.closeSnackBar}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  error: state.errorsReducer,
});

export default connect(mapStateToProps, { createUser })(Register);
