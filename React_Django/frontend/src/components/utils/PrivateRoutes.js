import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import SimpleBackdrop from "../widgets/SimpleBackDrop";

const PrivateRoutes = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) return <SimpleBackdrop open={true} />;
        else if (!auth.isAuthenticated) return <Redirect to="/login" />;
        else return <Component {...props} />;
      }}
    />
  );
};
const mapStateToProps = (state) => ({
  auth: state.authReducer,
});
export default connect(mapStateToProps)(PrivateRoutes);
