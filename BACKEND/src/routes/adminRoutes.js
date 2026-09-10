const express = require("express");

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getAllStudents,
    getAllRecruiters,
    getAllCompanies,
    getAllJobs,
    getAllApplications
} = require("../controllers/adminController");

const router = express.Router();

router.get(
    "/students",
    authenticateToken,
    authorizeRoles("admin"),
    getAllStudents
);

router.get(
    "/recruiters",
    authenticateToken,
    authorizeRoles("admin"),
    getAllRecruiters
);

router.get(
    "/companies",
    authenticateToken,
    authorizeRoles("admin"),
    getAllCompanies
);

router.get(
    "/jobs",
    authenticateToken,
    authorizeRoles("admin"),
    getAllJobs
);

router.get(
    "/applications",
    authenticateToken,
    authorizeRoles("admin"),
    getAllApplications
);

module.exports = router;