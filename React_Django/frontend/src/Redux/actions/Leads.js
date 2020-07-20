import Axios from "axios";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";
import { createSuccessMessage, createErrorMessage } from "./Messages";
import TokenConfig from "../../components/utils/TokenConfig";

//Get Leads
export const getLeads = () => (dispatch, getState) => {
  let config = TokenConfig(getState);
  Axios.get("/api/leads/", config)
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((error) => {
      const errors = {
        responseMessage: error.response.data,
        status: error.response.status,
      };
      dispatch(createErrorMessage(errors));
    });
};

//Add Lead
export const addLead = (lead) => (dispatch, getState) => {
  let config = TokenConfig(getState);
  Axios.post(`/api/leads/`, lead, config)
    .then((res) => {
      dispatch(createSuccessMessage({ message: "Lead Created" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((error) => {
      const errors = {
        responseMessage: error.response.data,
        status: error.response.status,
      };
      dispatch(createErrorMessage(errors));
    });
};

//Delete Lead
export const deleteLead = (id) => (dispatch, getState) => {
  let config = TokenConfig(getState);
  Axios.delete(`/api/leads/${id}/`, config)
    .then((res) => {
      dispatch(createSuccessMessage({ message: "Deleted Lead" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((error) => {
      const errors = {
        responseMessage: error.response.data,
        status: error.response.status,
      };
      dispatch(createErrorMessage(errors));
    });
};
