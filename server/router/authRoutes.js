import express from "express"
import client from "../config/connectdatabase.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const { rows: existingUser } = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await client.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashPassword]
        );

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user from database
        const { rows } = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Compare password
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "3h" });

        return res.status(200).json({ token });
        na
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1];
        if(!token){
            return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next()
    } catch (error) {
        return res.status(500).json({message: "server error"})
    }
}
router.get('/home', verifyToken, async (req, res) => {
    try {
        const { rows } = await client.query("SELECT * FROM users WHERE id = $1", [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }
        return res.status(200).json({user: rows[0]})
    } catch (error) {
        return res.status(500).json({message: "server error"})
    }
})

export default router;