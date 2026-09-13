const pool = require("../db");

const getAllJobs = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                j.job_id,
                j.job_title,
                j.description,
                j.location,
                j.job_type,
                j.salary,
                j.deadline,
                j.status,
                c.company_id,
                c.company_name
             FROM job j
             JOIN company c
                ON j.company_id = c.company_id
             ORDER BY j.deadline`
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


const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT
                j.job_id,
                j.job_title,
                j.description,
                j.location,
                j.job_type,
                j.salary,
                j.deadline,
                j.status,
                c.company_id,
                c.company_name
             FROM job j
             JOIN company c
                ON j.company_id = c.company_id
             WHERE j.job_id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json({
            job: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch job"
        });
    }
};


module.exports = {
    getAllJobs,
    getJobById
};