import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ModalBody,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  ModalFooter,
  Button,
  Spinner
} from "reactstrap";
import { updateStudent } from "../../redux/actions/studentAction";

const initialState = {
  firstname: "",
  lastname: "",
  fathername: "",
  mobileno: "",
  dob: "",
  country: "",
  address: "",
  gender: "",
};

const StudentModal = ({ student }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const {
    firstname,
    lastname,
    fathername,
    mobileno,
    dob,
    country,
    address,
    gender,
  } = formData;
  useEffect(() => {
    for (var prop in formData) {
      if (formData.hasOwnProperty(prop)) {
        formData[prop] = student[prop];
      }
    }
  }, []);

  const changeFormData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeRadio = (data) => {
    setFormData({ ...formData, ["gender"]: data });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await dispatch(updateStudent(student._id, formData));
    setLoading(false)
  };
  return (
    <>
      <ModalBody>
        {student.images.map((s, i) => (
          <img className="col-md-4" src={s.url} alt="" key={i} />
        ))}

        <Form>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="firstname">First Name</Label>
                <Input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => changeFormData(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="lastname">Last Name</Label>
                <Input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => changeFormData(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="fathername">Father's Name</Label>
                <Input
                  type="text"
                  name="fathername"
                  value={fathername}
                  onChange={(e) => changeFormData(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="mobileno">Mobile No.</Label>
                <Input
                  type="text"
                  name="mobileno"
                  value={mobileno}
                  onChange={(e) => changeFormData(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="dob">DOB</Label>
                <Input
                  type="date"
                  name="dob"
                  onChange={(e) => changeFormData(e)}
                  value={dob.split("T")[0]}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input
                  type="select"
                  name="country"
                  value={country}
                  onChange={(e) => changeFormData(e)}
                >
                  <option>india</option>
                  <option>australia</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="genderLabel">Gender</Label>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <Input
                          type="radio"
                          name="gender"
                          checked={gender === "male"}
                          onChange={(e) => changeRadio("male")}
                        />
                        Male
                      </td>
                      <td>
                        <Input
                          type="radio"
                          name="gender"
                          checked={gender === "female"}
                          onChange={(e) => changeRadio("female")}
                        />
                        Female
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input
              type="textarea"
              name="address"
              value={address}
              onChange={(e) => changeFormData(e)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={(e) => onSubmit(e)}>
          {loading ? <Spinner size="sm" color="light" /> : "Update"}
        </Button>{" "}
      </ModalFooter>
    </>
  );
};

export default StudentModal;
