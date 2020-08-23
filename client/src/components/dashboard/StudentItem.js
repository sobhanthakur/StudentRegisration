import React, { useState } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import StudentModal from "./StudentModal";

const StudentItem = ({ student }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <tr>
        <td>{student.firstname}</td>
        <td>{student.lastname}</td>
        <td>{student.email}</td>
        <td>
          <Button color="link" onClick={toggle}>
            View Details
          </Button>
        </td>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle}>{student.email}</ModalHeader>
          <StudentModal student={student}></StudentModal>
          
        </Modal>
      </tr>
    </>
  );
};

export default StudentItem;
