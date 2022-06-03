import axios from "axios";
import {
  APPLY_JOB_FAILURE,
  //   APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
} from "./actionTypes";

// const applyJobRequest = () => {
//   return {
//     type: APPLY_JOB_REQUEST,
//   };
// };

const applyJobSuccess = () => {
  return {
    type: APPLY_JOB_SUCCESS,
  };
};

const applyJobFailure = () => {
  return {
    type: APPLY_JOB_FAILURE,
  };
};

export const makeApplyRequest = ({ user_id, saved_jobs, applied_job }) => (
  dispatch
) => {
  // dispatch(applyJobRequest())
  axios
    .patch(`https://indeed-mock-server.herokuapp.com/users/${user_id}`, {
      saved_jobs,
      applied_job,
    })
    .then((res) => {
      dispatch(applyJobSuccess());
    })
    .catch((err) => {
      dispatch(applyJobFailure());
    });
};
