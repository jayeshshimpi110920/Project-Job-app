import axios from "axios";
import {
  SAVE_JOB_FAILURE,
  SAVE_JOB_REQUEST,
  SAVE_JOB_SUCCESS,
} from "./actionType";

const saveJobRequest = () => {
  return {
    type: SAVE_JOB_REQUEST,
  };
};

const saveJobSuccess = () => {
  return {
    type: SAVE_JOB_SUCCESS,
  };
};

const saveJobFailure = () => {
  return {
    type: SAVE_JOB_FAILURE,
  };
};

export const makeSaveJobRequest = ({ user_id, saved_jobs }) => (dispatch) => {
  dispatch(saveJobRequest());
  // console.log(`${user_id}`);
  axios
    .patch("http://localhost:9002/user", {
      saved_jobs,
    })
    .then((res) => {
      dispatch(saveJobSuccess());
    })
    .catch((err) => {
      dispatch(saveJobFailure());
    });
};
