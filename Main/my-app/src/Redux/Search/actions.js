import {
  COUNT_TOTAL_RESULT,
  FETCH_ERROR,
  SET_PAGE,
  FETCH_LOADING,
  FETCH_SUCCESS,
} from "./actionTypes";
import axios from "axios";

// https://job-api-jayesh-deploy.herokuapp.com/
// https://indeed-mock-server.herokuapp.com

const base_url = "https://indeed-mock-server.herokuapp.com";
export const fetchSuccess = (payload) => {
  return {
    type: FETCH_SUCCESS,
    payload,
  };
};

const fetchloading = () => {
  return {
    type: FETCH_LOADING,
  };
};

const fetchError = () => {
  return {
    type: FETCH_ERROR,
  };
};

export const setCurrentPage = payload=>{
    return{
      type:SET_PAGE,
      payload
    }
}

// const putJobsById = (payload) => {
//   return {
//     type: FETCH_JOBS_ID_SUCCESS,
//     payload,
//   };
// };

export const addJobs = (payload) => (dispatch) => {
  var config = {
    method: "post",
    url: `${base_url}/jobs`,
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config).then((res) => res.data);
};



export const setCount = (payload) => {
  return {
    type: COUNT_TOTAL_RESULT,
    payload,
  };
};

export const dispatchCount = (payload) => (dispatch) => {
  const { job, location, start, jobType } = payload;
  // console.log(job,location,start)

  var config = {
    method: "GET",
    url: `${base_url}/jobs`,
    params: {
      q: job,
      city_like: location,
      jobType_like: jobType,
      _start: start,

      // _sort:"date",
      // _order:""
    },
  };

  axios(config).then((res) => {
    // console.log("data",res.data)
    dispatch(setCount(res.data.length));
  });
};

export const getSearchData = (job = "", location = "", page = "1") => (
  dispatch
) => {
  dispatch(fetchloading());

  let url = `${base_url}/jobs?_page=${page}&_limit=5`;

  if (location !== "" && job !== "") {
    url = `${base_url}/jobs?location_like=${location}&jobTitle_like=${job}&_page=${page}&_limit=5`;
  } else if (location !== "") {
    url = `${base_url}/jobs?location_like=${location}&_page=${page}&_limit=5`;
  } else if (job !== "") {
    url = `${base_url}/jobs?jobTitle_like=${job}&_page=${page}&_limit=5`;
  } else return;

  var config = {
    method: "GET",
    url: url,
  };

  axios(config)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
      // res.data.results?.map(item=>dispatch(addJobs(item)))
    })
    .then(() => {
      let url = `${base_url}/jobs`;

      if (location !== "" && job !== "") {
        url = `${base_url}/jobs?location_like=${location}&jobTitle_like=${job}`;
      } else if (location !== "") {
        url = `${base_url}/jobs?location_like=${location}`;
      } else if (job !== "") {
        url = `${base_url}/jobs?jobTitle_like=${job}`;
      }
      axios({
        method: "GET",
        url: url,
      }).then((res) => {
        dispatch(setCount(res.data.length));
      });
    })
    .catch((err) => {
      console.log("error");
      dispatch(fetchError());
    });
};
