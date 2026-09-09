const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authenticateToken = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Placement Platform Backend is running!");
});

app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Database connected successfully!",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "You accessed a protected route!",
        user: req.user
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
