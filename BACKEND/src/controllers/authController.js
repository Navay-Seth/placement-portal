const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerStudent = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            department_id,
            cgpa,
            graduation_year
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO student
            (name, email, password, phone, department_id, cgpa, graduation_year)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING student_id, name, email`,
            [
                name,
                email,
                hashedPassword,
                phone,
                department_id,
                cgpa,
                graduation_year
            ]
        );

        res.status(201).json({
            message: "Student registered successfully",
            student: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Student registration failed"
        });
    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            `SELECT * FROM student WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const student = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            student.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: student.student_id,
                role: "student"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login failed"
        });
    }
};

const registerRecruiter = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            company_id
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO recruiter
            (name, email, password, company_id)
            VALUES ($1, $2, $3, $4)
            RETURNING recruiter_id, name, email, company_id`,
            [
                name,
                email,
                hashedPassword,
                company_id
            ]
        );

        res.status(201).json({
            message: "Recruiter registered successfully",
            recruiter: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Recruiter registration failed"
        });
    }
};


const loginRecruiter = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            `SELECT * FROM recruiter WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const recruiter = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            recruiter.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: recruiter.recruiter_id,
                role: "recruiter",
                company_id: recruiter.company_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login failed"
        });
    }
};


const registerAdmin = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO admin
            (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING admin_id, name, email`,
            [
                name,
                email,
                hashedPassword
            ]
        );

        res.status(201).json({
            message: "Admin registered successfully",
            admin: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Admin registration failed"
        });
    }
};


const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            `SELECT * FROM admin WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const admin = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: admin.admin_id,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login failed"
        });
    }
};

module.exports = {
    registerStudent,
    loginStudent,
    registerRecruiter,
    loginRecruiter,
    registerAdmin,
    loginAdmin
};