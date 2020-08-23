const Student = require("../../models/Student");
/*
 * Add new Student
 */
const add = async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    fathername,
    address,
    mobileno,
    gender,
    dob,
    country,
    images,
  } = req.body;

  try {
    // See if user already exists
    let student = await Student.findOne({ email });

    if (student) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Student already exists" }] });
    }

    // Create new User
    student = new Student({
      email,
      firstname,
      lastname,
      address,
      mobileno,
      gender,
      dob,
      country,
      images,
      fathername,
    });

    student.user = req.user.id;

    // Save to DB (Commit)
    await student.save();

    res.json(student);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * Get All Students
 */
const getAll = async (req, res) => {
  try {
    // Get All students
    let students = await Student.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(students);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * Get Student By ID
 */
const getStudentByID = async (req, res) => {
  try {
    // Get All students
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Student doesn't exist" }] });
    }

    if (student.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * Delete Student By ID
 */
const deleteStudentByID = async (req, res) => {
  try {
    // Get All students
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Student doesn't exist" }] });
    }

    if (student.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    student.remove();

    res.json({ msg: "Student Removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * Update Student
 */
const update = async (req, res) => {

  try {
    // See if user already exists
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Student not found" }] });
    }

    for (var prop in req.body) {
        if (req.body.hasOwnProperty(prop)) {
            student[prop] = req.body[prop];
        }
    }

    // Save to DB (Commit)
    await student.save();

    res.json(student);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

module.exports = { add, getAll, getStudentByID, deleteStudentByID, update };
