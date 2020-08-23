import React, { useState } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import StudentModal from "./StudentModal";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../../redux/actions/studentAction";

const StudentItem = ({ student }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  return (
    <>
      <tr>
        <td>{student.firstname}</td>
        <td>{student.lastname}</td>
        <td>{student.email}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={e => dispatch(deleteStudent(student._id))}
          >
            Delete
          </Button>
        </td>
        <td>
          <Button color="link" onClick={toggle}>
            View Details
          </Button>
        </td>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle}>Student Details</ModalHeader>
          <StudentModal student={student}></StudentModal>
        </Modal>
      </tr>
    </>
  );
};

export default StudentItem;
