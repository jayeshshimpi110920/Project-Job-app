import axios from "axios";
import { v4 as uuid } from "uuid";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes";

const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

const registerFailure = (errorMsg) => {
  return {
    type: REGISTER_FAILURE,
    payload: errorMsg,
  };
};

export const makeRegisterRequest = ({ email, password }) => (dispatch) => {
  dispatch(registerRequest());

  axios
    .get("http://localhost:9002/login")
    .then((res) => {
      console.log(res.data.users);
      dispatch(checkUserExists(email, password, res.data.users));
    })
    .catch((err) => dispatch(registerFailure("Something went wrong")));
};

const checkUserExists = (email, password, usersData) => (dispatch) => {
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email === email) {
      alert("already exist")
      // dispatch(registerFailure("user already exists"));
      return;
    }
  }

  dispatch(registerNewUser({ email, password }));
};

const registerNewUser = ({ email, password }) => (dispatch) => {

  axios.post("https://indeed-mock-server.herokuapp.com/users",{
    email,
    password,
    user_id: uuid(),
    saved_jobs: {},
    applied_job: {},
    my_reviews: {},
  })

const obj={};

  axios
    .post("http://localhost:9002/register", {
      email,
      password,
      user_id: uuid(),
      saved_jobs: {},
      applied_job: {},
      my_reviews: {},
    })
    .then((res) => dispatch(registerSuccess()));

    alert("Register sucessfully  :) ");
};



// import axios from "axios";
// import { v4 as uuid } from "uuid";
// import {
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   REGISTER_FAILURE,
// } from "./actionTypes";

// const registerRequest = () => {
//   return {
//     type: REGISTER_REQUEST,
//   };
// };

// const registerSuccess = () => {
//   return {
//     type: REGISTER_SUCCESS,
//   };
// };

// const registerFailure = (errorMsg) => {
//   return {
//     type: REGISTER_FAILURE,
//     payload: errorMsg,
//   };
// };

// export const makeRegisterRequest = ({ email, password }) => (dispatch) => {
//   dispatch(registerRequest());

//   axios
//     .get("https://indeed-mock-server.herokuapp.com/users")
//     .then((res) => {
//       dispatch(checkUserExists(email, password, res.data));
//     })
//     .catch((err) => dispatch(registerFailure("Something went wrong")));
// };

// const checkUserExists = (email, password, usersData) => (dispatch) => {
//   for (let i = 0; i < usersData.length; i++) {
//     if (usersData[i].email === email) {
//       dispatch(registerFailure("user already exists"));
//       return;
//     }
//   }

//   dispatch(registerNewUser({ email, password }));
// };

// const registerNewUser = ({ email, password }) => (dispatch) => {
//   axios
//     .post("http://localhost:9002/register", {
//       email,
//       password,
//       user_id: uuid(),
//       saved_jobs: {},
//       applied_job: {},
//       my_reviews: {},
//     })
//     .then((res) => dispatch(registerSuccess()));
// };


// import axios from "axios";
// import { v4 as uuid } from "uuid";
// import {
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   REGISTER_FAILURE,
// } from "./actionTypes";

// const registerRequest = () => {
//   return {
//     type: REGISTER_REQUEST,
//   };
// };

// const registerSuccess = () => {
//   return {
//     type: REGISTER_SUCCESS,
//   };
// };

// const registerFailure = (errorMsg) => {
//   return {
//     type: REGISTER_FAILURE,
//     payload: errorMsg,
//   };
// };

// export const makeRegisterRequest = ({ email, password }) => (dispatch) => {
//   dispatch(registerRequest());

//   axios
//     .get("https://indeed-mock-server.herokuapp.com/users")
//     .then((res) => {
//       dispatch(checkUserExists(email, password, res.data));
//     })
//     .catch((err) => dispatch(registerFailure("Something went wrong")));
// };

// const checkUserExists = (email, password, usersData) => (dispatch) => {
//   for (let i = 0; i < usersData.length; i++) {
//     if (usersData[i].email === email) {
//       dispatch(registerFailure("user already exists"));
//       return;
//     }
//   }

//   dispatch(registerNewUser({ email, password }));
// };

// const registerNewUser = ({ email, password }) => (dispatch) => {
//   axios
//     .post("https://indeed-mock-server.herokuapp.com/users", {
//       email,
//       password,
//       user_id: uuid(),
//       saved_jobs: {},
//       applied_job: {},
//       my_reviews: {},
//     })
//     .then((res) => dispatch(registerSuccess()));
// };
