import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead } from "../../Redux/actions/Leads";
import CustomSnackBar from "../widgets/CustomSnackBar";

class Leads extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackPosition: { vertical: "top", horizontal: "center" },
      responseMessage: "",
      isError: "",
    };
    this.closeSnackBar = this.closeSnackBar.bind(this);
    this.setResponse = this.setResponse.bind(this);
  }

  componentDidMount() {
    this.props.getLeads();
  }

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

  render() {
    const { leads, deleteLead } = this.props;
    const {
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

    return (
      <div>
        <center>
          <h2>Leads</h2>
        </center>
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              return (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.message}</td>
                  <td>
                    <button
                      onClick={deleteLead.bind(this, lead.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <CustomSnackBar
          values={snackValues}
          closeSnackBar={this.closeSnackBar}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  leads: state.leadsReducer.leads,
  error: state.errorsReducer,
  message: state.messagesReducer,
});

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
