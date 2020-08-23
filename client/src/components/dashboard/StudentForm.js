import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Button,
  Spinner,
} from "reactstrap";
import { addStudent, updateStudent } from "../../redux/actions/studentAction";

const initialState = {
  firstname: "",
  lastname: "",
  fathername: "",
  mobileno: "",
  dob: "",
  country: "india",
  address: "",
  gender: "male",
  email: "",
};
const StudentForm = ({ student }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (student) {
      for (var prop in formData) {
        if (formData.hasOwnProperty(prop)) {
          formData[prop] = student[prop];
        }
      }
    }
  }, []);
  const {
    firstname,
    lastname,
    fathername,
    mobileno,
    dob,
    country,
    address,
    gender,
    email,
  } = formData;

  const changeFormData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeRadio = (data) => {
    setFormData({ ...formData, ["gender"]: data });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (student) {
      await dispatch(updateStudent(student._id, formData))
    } else {
      await dispatch(addStudent(formData));
      setFormData(initialState);
    }
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="firstname">First Name</Label>
            <Input
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => changeFormData(e)}
              required
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
              required
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
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="mobileno">Mobile No.</Label>
            <Input
              type="number"
              name="mobileno"
              value={mobileno}
              onChange={(e) => changeFormData(e)}
              required
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
              required
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
              required
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
        <Col md={8}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => changeFormData(e)}
              disabled={student ? true : false}
              required
            />
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
          required
        />
      </FormGroup>
      <Button color="warning">
        {loading ? (
          <Spinner size="sm" />
        ) : student ? (
          "Update"
        ) : (
          "Submit"
        )}
      </Button>{" "}
    </Form>
  );
};

export default StudentForm;
