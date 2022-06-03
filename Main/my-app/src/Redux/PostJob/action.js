import {
  POST_JOB_REQUEST,
  POST_JOB_SUCCESS,
  POST_JOB_FAILURE,
} from "./actionType";
import { v4 as uuid } from "uuid";
import axios from "axios";

const postJobRequest = () => {
  return {
    type: POST_JOB_REQUEST,
  };
};

const postJobSuccess = () => {
  return {
    type: POST_JOB_SUCCESS,
  };
};

const postJobFailure = () => {
  return {
    type: POST_JOB_FAILURE,
  };
};

export const makePostJobRequest = (payload)=>(dispatch)=>{
    dispatch(postJobRequest())
    
    return axios.post('https://indeed-mock-server.herokuapp.com/jobs',{
        ...payload,
        jobkey:uuid()
    }).then(res=>dispatch(postJobSuccess())).catch(err=>{
        dispatch(postJobFailure())
    })
    .then((res) => dispatch(postJobSuccess()))
    .catch((err) => {
      dispatch(postJobFailure());
    });
};
