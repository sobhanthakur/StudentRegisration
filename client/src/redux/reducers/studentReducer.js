import { LOAD_STUDENT, UPDATE_STUDENT, CLEAR_STUDENT } from "../types";

const initialState = {
  loading: true,
  students: [],
};

const studentReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOAD_STUDENT:
      return {
        loading: false,
        students: payload,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        loading: false,
        students: state.students.map((student) =>
          student._id === payload._id
            ? {
                ...student,
                firstname: payload.firstname,
                lastname: payload.lastname,
                fathername: payload.fathername,
                mobileno: payload.mobileno,
                dob: payload.dob,
                country: payload.country,
                gender: payload.gender,
                address: payload.address,
              }
            : student
        ),
      };
    case CLEAR_STUDENT:
      return {
        ...state,
        loading: false,
        students: [],
      };
    default:
      return state;
  }
};
export default studentReducer;
