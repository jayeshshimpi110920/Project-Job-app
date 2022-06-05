import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (currentUser) => {
  return {
    type: LOGIN_SUCCESS,
    payload: currentUser,
  };
};

const loginFailure = (errorMsg) => {
  return {
    type: LOGIN_FAILURE,
    payload: errorMsg,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const makeLoginRequest = ({ email, password }) => (dispatch) => {
  dispatch(loginRequest())


  // https://indeed-mock-server.herokuapp.com/users

  axios
    .get("http://localhost:9002/login")
    .then((res) => {
      console.log(res.data.users);
      dispatch(authenticateUser(email, password, res.data.users));

    })
    .catch((err) => dispatch(loginFailure("Somthing went wrong")));
};

const authenticateUser = (email, password, usersData ) => (dispatch) => {
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email === email && usersData[i].password === password) {
      dispatch(loginSuccess(usersData[i]));
      return;
    } else {
      if (usersData[i].email === email && usersData[i].password !== password) {
        dispatch(loginFailure("Wrong password"));
        return;
      }
    }
  }

  dispatch(loginFailure("User Does Not Exist"));
};



// import axios from "axios";
// import {
//   LOGIN_FAILURE,
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGOUT,
// } from "./actionTypes";

// const loginRequest = () => {
//   return {
//     type: LOGIN_REQUEST,
//   };
// };

// const loginSuccess = (currentUser) => {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: currentUser,
//   };
// };

// const loginFailure = (errorMsg) => {
//   return {
//     type: LOGIN_FAILURE,
//     payload: errorMsg,
//   };
// };

// export const logout = () => {
//   return {
//     type: LOGOUT,
//   };
// };

// export const makeLoginRequest = ({ email, password }) => (dispatch) => {
//   dispatch(loginRequest());

//   axios
//     .get("https://indeed-mock-server.herokuapp.com/users")
//     .then((res) => {
//       dispatch(authenticateUser(email, password, res.data));
//     })
//     .catch((err) => dispatch(loginFailure("Somthing went wrong")));
// };

// const authenticateUser = (email, password, usersData) => (dispatch) => {
//   for (let i = 0; i < usersData.length; i++) {
//     if (usersData[i].email === email && usersData[i].password === password) {
//       dispatch(loginSuccess(usersData[i]));
//       return;
//     } else {
//       if (usersData[i].email === email && usersData[i].password !== password) {
//         dispatch(loginFailure("Wrong password"));
//         return;
//       }
//     }
//   }

//   dispatch(loginFailure("User Does Not Exist"));
// };
