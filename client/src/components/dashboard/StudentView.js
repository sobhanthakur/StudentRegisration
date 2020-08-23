import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStudent } from "../../redux/actions/studentAction";
import { Table, Spinner } from "reactstrap";
import StudentItem from "./StudentItem";

const StudentView = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => ({
    students: state.studentReducer,
  }));

  useEffect(() => {
    dispatch(loadStudent());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      {state.students.loading ? (
        <Spinner color="warning"></Spinner>
      ) : (
        state.students.students.length > 0 && (
          <Table striped>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Remove</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.students.students.map((student) => (
                <StudentItem student={student} key={student._id}></StudentItem>
              ))}
            </tbody>
          </Table>
        )
      )}
    </div>
  );
};

export default StudentView;
