const pool = require("../db");

const getAllStudents = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                s.student_id,
                s.name,
                s.email,
                s.phone,
                d.department_name,
                s.cgpa,
                s.graduation_year
             FROM student s
             JOIN department d
                ON s.department_id = d.department_id
             ORDER BY s.student_id`
        );

        res.json({
            students: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
};


const getAllRecruiters = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                r.recruiter_id,
                r.name,
                r.email,
                c.company_name
             FROM recruiter r
             JOIN company c
                ON r.company_id = c.company_id
             ORDER BY r.recruiter_id`
        );

        res.json({
            recruiters: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch recruiters"
        });
    }
};


const getAllCompanies = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                company_id,
                company_name,
                email,
                website
             FROM company
             ORDER BY company_id`
        );

        res.json({
            companies: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch companies"
        });
    }
};


const getAllJobs = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                j.job_id,
                j.job_title,
                c.company_name,
                r.name AS recruiter_name,
                j.location,
                j.salary,
                j.job_type,
                j.deadline,
                j.status
             FROM job j
             JOIN company c
                ON j.company_id = c.company_id
             JOIN recruiter r
                ON j.recruiter_id = r.recruiter_id
             ORDER BY j.job_id`
        );

        res.json({
            jobs: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch jobs"
        });
    }
};


const getAllApplications = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                a.application_id,
                s.name AS student_name,
                j.job_title,
                c.company_name,
                a.application_date,
                a.status
             FROM application a
             JOIN student s
                ON a.student_id = s.student_id
             JOIN job j
                ON a.job_id = j.job_id
             JOIN company c
                ON j.company_id = c.company_id
             ORDER BY a.application_date DESC`
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


module.exports = {
    getAllStudents,
    getAllRecruiters,
    getAllCompanies,
    getAllJobs,
    getAllApplications
};