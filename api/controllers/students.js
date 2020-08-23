const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const studentService = require("../services/students");

const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/student
// @desc     Register Student
// @access   Public

router.post(
  "/",
  [
    auth,
    check("firstname", "firstname must be present").not().isEmpty(),
    check("lastname", "lastname must be present").not().isEmpty(),
    check("fathername", "fathername must be present").not().isEmpty(),
    check("address", "address must be present").not().isEmpty(),
    check("mobileno", "mobileno must be present").not().isEmpty(),
    check("gender", "gender must be present").not().isEmpty(),
    check("dob", "dob must be present").not().isEmpty(),
    check("country", "country must be present").not().isEmpty(),
    check("images", "images must be present").not().isEmpty(),
    check("email", "Please Include a valid email").isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    // Throw Exception if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return studentService.add(req, res);
  }
);

// @route    GET api/student
// @desc     Get all students
// @access   Public

router.get("/", [auth], (req, res) => {
  return studentService.getAll(req, res);
});

// @route    GET api/student/:id
// @desc     Get student by id
// @access   Public

router.get("/:id", [auth, checkObjectId("id")], (req, res) => {
  return studentService.getStudentByID(req, res);
});

// @route    DELETE api/student/:id
// @desc     Delete student by id
// @access   Public

router.delete("/:id", [auth, checkObjectId("id")], (req, res) => {
  return studentService.deleteStudentByID(req, res);
});

// @route    PUT api/student/:id
// @desc     Update Student
// @access   Public

router.put(
  "/:id",
  [
    auth,
    check("firstname", "firstname must be present").not().isEmpty(),
    check("lastname", "lastname must be present").not().isEmpty(),
    check("fathername", "fathername must be present").not().isEmpty(),
    check("address", "address must be present").not().isEmpty(),
    check("mobileno", "mobileno must be present").not().isEmpty(),
    check("gender", "gender must be present").not().isEmpty(),
    check("dob", "dob must be present").not().isEmpty(),
    check("country", "country must be present").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    // Throw Exception if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return studentService.update(req, res);
  }
);

module.exports = router;
