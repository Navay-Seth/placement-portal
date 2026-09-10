const pool = require("../db");

const createJob = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const companyId = req.user.company_id;

        const {
            job_title,
            description,
            location,
            salary,
            job_type,
            deadline
        } = req.body;

        const result = await pool.query(
            `INSERT INTO job
                (job_title, description, company_id, recruiter_id,
                 location, salary, job_type, deadline)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [
                job_title,
                description,
                companyId,
                recruiterId,
                location,
                salary,
                job_type,
                deadline
            ]
        );

        res.status(201).json({
            message: "Job created successfully",
            job: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create job"
        });
    }
};

const getRecruiterJobs = async (req, res) => {
    try {
        const recruiterId = req.user.id;

        const result = await pool.query(
            `SELECT
                job_id,
                job_title,
                description,
                location,
                salary,
                job_type,
                deadline,
                status
             FROM job
             WHERE recruiter_id = $1
             ORDER BY deadline`,
            [recruiterId]
        );

        res.json({
            jobs: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch recruiter jobs"
        });
    }
};


const updateJob = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { id } = req.params;

        const {
            job_title,
            description,
            location,
            salary,
            job_type,
            deadline,
            status
        } = req.body;

        const result = await pool.query(
            `UPDATE job
             SET
                job_title = $1,
                description = $2,
                location = $3,
                salary = $4,
                job_type = $5,
                deadline = $6,
                status = $7
             WHERE job_id = $8
               AND recruiter_id = $9
             RETURNING *`,
            [
                job_title,
                description,
                location,
                salary,
                job_type,
                deadline,
                status,
                id,
                recruiterId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Job not found or you are not authorized to update it"
            });
        }

        res.json({
            message: "Job updated successfully",
            job: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update job"
        });
    }
};


const deleteJob = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM job
             WHERE job_id = $1
               AND recruiter_id = $2
             RETURNING job_id`,
            [id, recruiterId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Job not found or you are not authorized to delete it"
            });
        }

        res.json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete job"
        });
    }
};

const getJobApplications = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { job_id } = req.params;

        const result = await pool.query(
            `SELECT
                a.application_id,
                a.student_id,
                s.name AS student_name,
                s.email AS student_email,
                s.cgpa,
                a.application_date,
                a.status
             FROM application a
             JOIN student s
                ON a.student_id = s.student_id
             JOIN job j
                ON a.job_id = j.job_id
             WHERE a.job_id = $1
               AND j.recruiter_id = $2
             ORDER BY a.application_date DESC`,
            [job_id, recruiterId]
        );

        res.json({
            applications: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch applications"
        });
    }
};


const updateApplicationStatus = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { application_id } = req.params;
        const { status } = req.body;

        const result = await pool.query(
            `UPDATE application a
             SET status = $1
             FROM job j
             WHERE a.application_id = $2
               AND a.job_id = j.job_id
               AND j.recruiter_id = $3
             RETURNING a.*`,
            [status, application_id, recruiterId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Application not found or you are not authorized"
            });
        }

        res.json({
            message: "Application status updated successfully",
            application: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update application status"
        });
    }
};

const createInterview = async (req, res) => {
    try {
        const recruiterId = req.user.id;

        const {
            application_id,
            interview_date,
            interview_mode,
            status
        } = req.body;

        const result = await pool.query(
            `INSERT INTO interview
                (application_id, interview_date, interview_mode, status)
             SELECT $1, $2, $3, $4
             WHERE EXISTS (
                 SELECT 1
                 FROM application a
                 JOIN job j ON a.job_id = j.job_id
                 WHERE a.application_id = $1
                   AND j.recruiter_id = $5
             )
             RETURNING *`,
            [
                application_id,
                interview_date,
                interview_mode,
                status,
                recruiterId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Application not found or you are not authorized"
            });
        }

        res.status(201).json({
            message: "Interview scheduled successfully",
            interview: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to schedule interview"
        });
    }
};


const updateInterviewStatus = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { interview_id } = req.params;
        const { status } = req.body;

        const result = await pool.query(
            `UPDATE interview i
             SET status = $1
             FROM application a
             JOIN job j ON a.job_id = j.job_id
             WHERE i.interview_id = $2
               AND i.application_id = a.application_id
               AND j.recruiter_id = $3
             RETURNING i.*`,
            [status, interview_id, recruiterId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Interview not found or you are not authorized"
            });
        }

        res.json({
            message: "Interview status updated successfully",
            interview: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update interview status"
        });
    }
};


const createOffer = async (req, res) => {
    try {
        const recruiterId = req.user.id;

        const {
            application_id,
            offer_date,
            salary
        } = req.body;

        const result = await pool.query(
            `INSERT INTO offer
                (application_id, offer_date, salary)
             SELECT $1, $2, $3
             WHERE EXISTS (
                 SELECT 1
                 FROM application a
                 JOIN job j ON a.job_id = j.job_id
                 WHERE a.application_id = $1
                   AND j.recruiter_id = $4
             )
             RETURNING *`,
            [
                application_id,
                offer_date,
                salary,
                recruiterId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Application not found or you are not authorized"
            });
        }

        res.status(201).json({
            message: "Offer created successfully",
            offer: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create offer"
        });
    }
};


const updateOfferStatus = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { offer_id } = req.params;
        const { status } = req.body;

        const result = await pool.query(
            `UPDATE offer o
             SET status = $1
             FROM application a
             JOIN job j ON a.job_id = j.job_id
             WHERE o.offer_id = $2
               AND o.application_id = a.application_id
               AND j.recruiter_id = $3
             RETURNING o.*`,
            [status, offer_id, recruiterId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Offer not found or you are not authorized"
            });
        }

        res.json({
            message: "Offer status updated successfully",
            offer: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update offer status"
        });
    }
};

module.exports = {
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
};