import { LOAD_STUDENT,UPDATE_STUDENT } from "../types";
import axios from "axios";

import { setAlert } from "./alertAction";

// Load Student
export const loadStudent = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/student");

    dispatch({
      type: LOAD_STUDENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Something went wrong", "danger", 4000));
  }
};

// update Student
export const updateStudent = (id,payload) => async (dispatch) => {
  console.log(payload)
  try {
    const res = await axios.put("/api/student/"+id,payload);

    dispatch({
      type: UPDATE_STUDENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Something went wrong", "danger", 4000));
  }
};
