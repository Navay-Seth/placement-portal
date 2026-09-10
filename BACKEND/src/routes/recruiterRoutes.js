const express = require("express");

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    createJob,
    getRecruiterJobs,
    updateJob,
    deleteJob,
    getJobApplications,
    updateApplicationStatus,
    createInterview,
    updateInterviewStatus,
    createOffer,
    updateOfferStatus
} = require("../controllers/recruiterController");

const router = express.Router();

router.post(
    "/jobs",
    authenticateToken,
    authorizeRoles("recruiter"),
    createJob
);

router.get(
    "/jobs",
    authenticateToken,
    authorizeRoles("recruiter"),
    getRecruiterJobs
);

router.put(
    "/jobs/:id",
    authenticateToken,
    authorizeRoles("recruiter"),
    updateJob
);

router.delete(
    "/jobs/:id",
    authenticateToken,
    authorizeRoles("recruiter"),
    deleteJob
);

router.get(
    "/jobs/:job_id/applications",
    authenticateToken,
    authorizeRoles("recruiter"),
    getJobApplications
);

router.put(
    "/applications/:application_id",
    authenticateToken,
    authorizeRoles("recruiter"),
    updateApplicationStatus
);

router.post(
    "/interviews",
    authenticateToken,
    authorizeRoles("recruiter"),
    createInterview
);

router.put(
    "/interviews/:interview_id",
    authenticateToken,
    authorizeRoles("recruiter"),
    updateInterviewStatus
);

router.post(
    "/offers",
    authenticateToken,
    authorizeRoles("recruiter"),
    createOffer
);

router.put(
    "/offers/:offer_id",
    authenticateToken,
    authorizeRoles("recruiter"),
    updateOfferStatus
);

module.exports = router;