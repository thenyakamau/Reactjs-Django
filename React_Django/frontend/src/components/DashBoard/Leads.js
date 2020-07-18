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
      snackPostion: { vertical: "bottom", horizontal: "center" },
    };
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }

  componentDidMount() {
    this.props.getLeads();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ openSnackBar: true });
    }
  }

  closeSnackBar() {
    this.setState({ openSnackBar: false });
  }

  render() {
    const { leads, deleteLead, error } = this.props;
    const { openSnackBar, snackPostion } = this.state;
    const isError = error.isError;
    let value = Object.keys(error.responseMessage)[0];
    const responseMessage = error.responseMessage[value];
    console.log(responseMessage);
    const snackValues = {
      isError,
      responseMessage,
      openSnackBar,
      snackPostion,
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
            {leads.map((lead, index) => {
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
});

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
