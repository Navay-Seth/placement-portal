const express = require("express");

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");
const {
    getStudentProfile,
    getStudentSkills,
    addStudentSkill,
    removeStudentSkill,
    getStudentApplications,
    applyForJob,
    getStudentInterviews,
    getStudentOffers
} = require("../controllers/studentController");
const router = express.Router();

router.get("/profile", authenticateToken, authorizeRoles("student"), getStudentProfile);

router.get("/skills", authenticateToken, authorizeRoles("student"), getStudentSkills);

router.post("/skills", authenticateToken, authorizeRoles("student"), addStudentSkill);

router.delete("/skills/:skill_id", authenticateToken, authorizeRoles("student"), removeStudentSkill);

router.get("/applications", authenticateToken, authorizeRoles("student"), getStudentApplications);

router.post("/applications", authenticateToken, authorizeRoles("student"), applyForJob);

router.get("/interviews", authenticateToken, authorizeRoles("student"), getStudentInterviews);

router.get("/offers", authenticateToken, authorizeRoles("student"), getStudentOffers);

module.exports = router;