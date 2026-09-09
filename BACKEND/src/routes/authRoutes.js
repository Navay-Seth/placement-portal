const express = require("express");

const {
    registerStudent,
    loginStudent,
    registerRecruiter,
    loginRecruiter,
    registerAdmin,
    loginAdmin
} = require("../controllers/authController");

const router = express.Router();

router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);

router.post("/recruiter/register", registerRecruiter);
router.post("/recruiter/login", loginRecruiter);

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

module.exports = router;