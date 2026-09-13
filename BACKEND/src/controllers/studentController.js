const pool = require("../db");

const getStudentProfile = async (req, res) => {
    try {
        const studentId = req.user.id;

        const result = await pool.query(
            `SELECT 
                student_id,
                name,
                email,
                phone,
                department_id,
                cgpa,
                graduation_year
             FROM student
             WHERE student_id = $1`,
            [studentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            student: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch student profile"
        });
    }
};

const getStudentSkills = async (req, res) => {
    try {
        const studentId = req.user.id;

        const result = await pool.query(
            `SELECT s.skill_id, s.skill_name
             FROM skill s
             JOIN student_skill ss
             ON s.skill_id = ss.skill_id
             WHERE ss.student_id = $1
             ORDER BY s.skill_name`,
            [studentId]
        );

        res.json({
            skills: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch student skills"
        });
    }
};

const addStudentSkill = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { skill_id } = req.body;

        await pool.query(
            `INSERT INTO student_skill (student_id, skill_id)
             VALUES ($1, $2)`,
            [studentId, skill_id]
        );

        res.status(201).json({
            message: "Skill added successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add skill"
        });
    }
};

const removeStudentSkill = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { skill_id } = req.params;

        await pool.query(
            `DELETE FROM student_skill
             WHERE student_id = $1 AND skill_id = $2`,
            [studentId, skill_id]
        );

        res.json({
            message: "Skill removed successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to remove skill"
        });
    }
};

const getStudentApplications = async (req, res) => {
    try {
        const studentId = req.user.id;

        const result = await pool.query(
            `SELECT 
                a.application_id,
                a.job_id,
                j.job_title AS job_title,
                c.company_name,
                a.application_date,
                a.status
             FROM application a
             JOIN job j
                ON a.job_id = j.job_id
             JOIN company c
                ON j.company_id = c.company_id
             WHERE a.student_id = $1
             ORDER BY a.application_date DESC`,
            [studentId]
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


const applyForJob = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { job_id } = req.body;

        const result = await pool.query(
            `INSERT INTO application
                (student_id, job_id, application_date, status)
             VALUES ($1, $2, CURRENT_DATE, 'Applied')
             RETURNING application_id`,
            [studentId, job_id]
        );

        res.status(201).json({
            message: "Application submitted successfully",
            application_id: result.rows[0].application_id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to submit application"
        });
    }
};
const getStudentInterviews = async (req, res) => {
    try {
        const studentId = req.user.id;

        const result = await pool.query(
            `SELECT
                i.interview_id,
                i.application_id,
                i.interview_date,
                i.interview_mode,
                i.status
             FROM interview i
             JOIN application a
                ON i.application_id = a.application_id
             WHERE a.student_id = $1
             ORDER BY i.interview_date`,
            [studentId]
        );

        res.json({
            interviews: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch interviews"
        });
    }
};


const getStudentOffers = async (req, res) => {
    try {
        const studentId = req.user.id;

        const result = await pool.query(
            `SELECT
                o.offer_id,
                o.application_id,
                o.offer_date,
                o.salary,
                o.status
             FROM offer o
             JOIN application a
                ON o.application_id = a.application_id
             WHERE a.student_id = $1
             ORDER BY o.offer_date DESC`,
            [studentId]
        );

        res.json({
            offers: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch offers"
        });
    }
};

module.exports = {
    getStudentProfile,
    getStudentSkills,
    addStudentSkill,
    removeStudentSkill,
    getStudentApplications,
    applyForJob,
    getStudentInterviews,
    getStudentOffers
};