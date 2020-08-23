import { LOAD_STUDENT,UPDATE_STUDENT,ADD_STUDENT,DELETE_STUDENT } from "../types";
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
  try {
    const res = await axios.put("/api/student/"+id,payload);

    dispatch({
      type: UPDATE_STUDENT,
      payload: res.data,
    });
    dispatch(setAlert("Student Updated", "success", 4000));
  } catch (err) {
    dispatch(setAlert("Something went wrong", "danger", 4000));
  }
};

// add Student
export const addStudent = (payload) => async (dispatch) => {
  try {
    const res = await axios.post("/api/student",payload);

    dispatch({
      type: ADD_STUDENT,
      payload: res.data,
    });
    dispatch(setAlert("New Student Added", "success", 4000));
  } catch (err) {
    const errors = err.response;
    if (errors) {
      errors.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger", 4000))
      );
    }
  }
};

// delete Student
export const deleteStudent = (id) => async (dispatch) => {
  try {
    await axios.delete("/api/student/"+id);

    dispatch({
      type: DELETE_STUDENT,
      payload: id
    });
    dispatch(setAlert("Student Deleted", "success", 4000));
  } catch (err) {
    const errors = err.response;
    if (errors) {
      errors.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger", 4000))
      );
    }
  }
};
