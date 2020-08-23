import React from "react";
import StudentForm from "./StudentForm";
import { ModalBody } from "reactstrap";


const StudentModal = ({ student }) => {

  return (
    <>
      <ModalBody>
        {student.images.map((s, i) => (
          <img className="col-md-4" src={s.url} alt="" key={i} />
        ))}

        <StudentForm student={student}></StudentForm>
      </ModalBody>      
    </>
  );
};

export default StudentModal;
