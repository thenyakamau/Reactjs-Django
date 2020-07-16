import Axios from "axios";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

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
      console.log(error);
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
      console.log(error);
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
