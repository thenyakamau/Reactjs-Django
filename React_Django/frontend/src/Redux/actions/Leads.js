import Axios from "axios";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from "./types";

//Get Leads
export const getLeads = () => (dispatch) => {
  Axios.get("/api/leads/")
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

      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

//Add Lead
export const addLead = (lead) => (dispatch) => {
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  Axios.post(`/api/leads/`, lead, config)
    .then((res) => {
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
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

//Delete Lead
export const deleteLead = (id) => (dispatch) => {
  Axios.delete(`/api/leads/${id}/`)
    .then((res) => {
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
