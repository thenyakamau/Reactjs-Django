import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../Redux/actions/Auth";
import CustomSnackBar from "../widgets/CustomSnackBar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;
    if (error !== prevProps.error) this.setResponse(error);
    else if (message !== prevProps.message) this.setResponse(message);
  }

  setResponse(response) {
    this.setState({ openSnackBar: true });
    let value = Object.keys(response.responseMessage)[0];
    this.setState({ isError: response.isError });
    const responseMessage = response.responseMessage[value];
    if (responseMessage instanceof Array)
      this.setState({ responseMessage: responseMessage[0] });
    else this.setState({ responseMessage: responseMessage });
  }

  closeSnackBar() {
    this.setState({ openSnackBar: false });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser(username, password);
  }

  render() {
    const {
      username,
      password,
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

    const { isAuthenticated, error } = this.props;
    console.log(error);
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
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
              <center>
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </center>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
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

export default connect(mapStateToProps, { loginUser })(Login);
