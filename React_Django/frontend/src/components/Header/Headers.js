import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import green from "@material-ui/core/colors/green";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ProfileMenu from "./ProfileMenu";
import { logOutUser } from "../../Redux/actions/Auth";

class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.popUpMenu = this.popUpMenu.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  popUpMenu(e) {
    const { anchorEl } = this.state;
    if (anchorEl) {
      this.setState({ anchorEl: null });
    } else {
      this.setState({ anchorEl: e.currentTarget });
    }
  }

  logOut(e) {
    this.popUpMenu(e);
    this.props.logOutUser();
  }

  static propTyps = {
    auth: PropTypes.object.isRequired,
    logOutUser: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { anchorEl } = this.state;
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
              {isAuthenticated ? (
                <ul className="navbar-nav ml-auto mt-2">
                  <li className="nav-item active">
                    <Button
                      style={{ color: green[500] }}
                      variant="outlined"
                      startIcon={<PersonIcon />}
                      endIcon={<ArrowDropDownIcon />}
                      onClick={(e) => this.popUpMenu(e)}
                    >
                      {user.username}
                    </Button>
                    <ProfileMenu
                      popUpMenu={this.popUpMenu}
                      anchorEl={anchorEl}
                      logOut={this.logOut}
                    />
                  </li>
                </ul>
              ) : (
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
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logOutUser })(Headers);
