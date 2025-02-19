<<<<<<< HEAD
=======
// import express from "express"
// import client from "../config/connectdatabase.js";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// const router = express.Router()

// router.post("/register", async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         // Check if user already exists
//         const { rows: existingUser } = await client.query("SELECT * FROM users WHERE email = $1", [email]);
//         if (existingUser.length > 0) {
//             return res.status(409).json({ message: "User already exists" });
//         }

//         // Hash password
//         const hashPassword = await bcrypt.hash(password, 10);

//         // Insert user into database
//         await client.query(
//             "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
//             [username, email, hashPassword]
//         );

//         res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {

//         const userdetails = await client.query("SELECT * FROM users WHERE email = $1", [email])

//         // Fetch user from database
//         const { rows } = await client.query("SELECT * FROM users WHERE email = $1", [email]);
//         if (rows.length === 0) {
//             return res.status(404).json({ message: "User does not exist" });
//         }

//         // Compare password
//         const user = rows[0];
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Wrong password" });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "3h" });

//         return res.status(200).json({ token, data:userdetails });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// const verifyToken = async (req, res, next) => {
//     try {
//         const token = req.headers["authorization"].split(' ')[1];
//         if(!token){
//             return res.status(403).json({message: "No Token Provided"})
//         }
//         const decoded = jwt.verify(token, process.env.JWT_KEY)
//         req.userId = decoded.id;
//         next()
//     } catch (error) {
//         return res.status(500).json({message: "server error"})
//     }
// }
// router.get('/home', verifyToken, async (req, res) => {
//     try {
//         const { rows } = await client.query("SELECT * FROM users WHERE id = $1", [req.userId]);
//         if (rows.length === 0) {
//             return res.status(404).json({ message: "User does not exist" });
//         }
//         return res.status(200).json({user: rows[0]})
//     } catch (error) {
//         return res.status(500).json({message: "server error"})
//     }
// })

// export default router;

>>>>>>> c60241abd1eaaf9bca2f40f0d3442814b9ae3d24
import express from "express";
import client from "../config/connectdatabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Default values
const DEFAULT_USER = {
<<<<<<< HEAD
    username: "admin@admin",
    email: "admin@superlabs.com",
    password: "supersecret"
=======
  username: "admin@admin",
  email: "admin@superlabs.com",
  password: "supersecret",
>>>>>>> c60241abd1eaaf9bca2f40f0d3442814b9ae3d24
};

// Function to create default user if not exists
const createDefaultUser = async () => {
<<<<<<< HEAD
    try {
        const { rows: existingUser } = await client.query("SELECT * FROM users WHERE email = $1", [DEFAULT_USER.email]);
        if (existingUser.length === 0) {
            const hashPassword = await bcrypt.hash(DEFAULT_USER.password, 10);
            await client.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                [DEFAULT_USER.username, DEFAULT_USER.email, hashPassword]
            );
            console.log("Default user created successfully");
        }
    } catch (error) {
        console.error("Error creating default user:", error.message);
    }
=======
  try {
    const { rows: existingUser } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [DEFAULT_USER.email]
    );
    if (existingUser.length === 0) {
      const hashPassword = await bcrypt.hash(DEFAULT_USER.password, 10);
      await client.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        [DEFAULT_USER.username, DEFAULT_USER.email, hashPassword]
      );
      console.log("Default user created successfully");
    }
  } catch (error) {
    console.error("Error creating default user:", error.message);
  }
>>>>>>> c60241abd1eaaf9bca2f40f0d3442814b9ae3d24
};
createDefaultUser();

// Register Route
router.post("/register", async (req, res) => {
<<<<<<< HEAD
    let { username, email, password } = req.body;

    // Apply defaults if fields are empty
    username = username || DEFAULT_USER.username;
    email = email || DEFAULT_USER.email;
    password = password || DEFAULT_USER.password;

    try {
        // Check if user already exists
        const { rows: existingUser } = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }
=======
  let { username, email, password } = req.body;
>>>>>>> c60241abd1eaaf9bca2f40f0d3442814b9ae3d24

  // Apply defaults if fields are empty
  username = username || DEFAULT_USER.username;
  email = email || DEFAULT_USER.email;
  password = password || DEFAULT_USER.password;

<<<<<<< HEAD
        // Insert user into database
        const { rows: newUser } = await client.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashPassword]
        );

        res.status(201).json({ message: "User created successfully", user: newUser[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
=======
  try {
    // Check if user already exists
    const { rows: existingUser } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
>>>>>>> c60241abd1eaaf9bca2f40f0d3442814b9ae3d24
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const { rows: newUser } = await client.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashPassword]
    );

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
<<<<<<< HEAD
    let { email, password } = req.body;

    // Apply defaults if fields are empty
    email = email || DEFAULT_USER.email;
    password = password || DEFAULT_USER.password;

    try {
        // Fetch user from database
        const { rows } = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const user = rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "3h" });

        return res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
=======
  let { email, password } = req.body;

  // Apply defaults if fields are empty
  email = email || DEFAULT_USER.email;
  password = password || DEFAULT_USER.password;

  try {
    // Fetch user from database
    const { rows } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User does not exist" });
>>>>>>> c60241abd1eaaf9bca2f40f0d3442814b9ae3d24
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "3h",
    });

    return res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to Verify Token
const verifyToken = async (req, res, next) => {
<<<<<<< HEAD
    try {
        const token = req.headers["authorization"]?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// Protected Route (Requires Authentication)
router.get('/home', verifyToken, async (req, res) => {
    try {
        const { rows } = await client.query("SELECT * FROM users WHERE id = $1", [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User does not exist" });
        }
        return res.status(200).json({ user: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
=======
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
>>>>>>> c60241abd1eaaf9bca2f40f0d3442814b9ae3d24

// Protected Route (Requires Authentication)
router.get("/home", verifyToken, async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM users WHERE id = $1", [
      req.userId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }
    return res.status(200).json({ user: rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
