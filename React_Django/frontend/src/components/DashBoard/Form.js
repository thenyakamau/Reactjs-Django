import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../Redux/actions/Leads";

class Form extends Component {
  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    const { name, email, message } = this.state;
    e.preventDefault();
    const lead = { name, email, message };
    this.props.addLead(lead);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { name, email, message } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <center>
          <h2>Add Lead Form</h2>
        </center>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.onChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.onChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <input
              type="text"
              name="message"
              value={message}
              onChange={this.onChange}
              className="form-control"
              required
            />
          </div>

          <center>
            <input type="submit" className="btn btn-lg btn-primary" />
          </center>
        </form>
      </div>
    );
  }
}
export default connect(null, { addLead })(Form);
