// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config({ path: "./config/.env" });
// import cors from "cors"
// app.use(express.json());
// app.use(cors());
// import multer from 'multer';
// import router from "./router/router.js";
// import bodyParser from 'body-parser';
// import authRouter from "./router/authRoutes.js"

// app.use('auth', authRouter)
// const app = express();

// const fs = require("fs");

// const path = require("path");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static("public"));

// const client = require("./config/connectdatabase");
// app.use("/uploads", express.static("uploads"));

// ///////////Candidates

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = "./uploads";
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// //GET Single Data

// app.get("/candidates/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await client.query(
//       "SELECT * FROM candidates WHERE candidate_id = $1",
//       [id]
//     );

//     if (!result.rows[0]) {
//       return res.status(404).send("Candidate not found");
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//   }
// });

// // POST: Add a candidate
// app.post(
//   "/candidates",
//   upload.fields([{ name: "resume" }, { name: "cover" }]),
//   async (req, res) => {
//     try {
//       const { first_name, last_name, email, phone, linkedin, website } =
//         req.body;

//       const resume = req.files["resume"][0].filename;
//       const cover = req.files["cover"][0].filename;

//       const result = await client.query(
//         "INSERT INTO candidates (first_name, last_name, email, phone, linkedin, website, resume, cover) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
//         [first_name, last_name, email, phone, linkedin, website, resume, cover]
//       );

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// // GET: Fetch all candidates
// app.get("/candidates", async (req, res) => {
//   try {
//     const result = await client.query("SELECT * FROM candidates");
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// // GET: Fetch a single candidate
// app.get("/candidates/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await client.query(
//       "SELECT * FROM candidates WHERE id = $1",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).send("Candidate not found");
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// // DELETE: Remove a candidate
// app.delete("/candidates/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await client.query(
//       "DELETE FROM candidates WHERE id = $1 RETURNING *",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).send("Candidate not found");
//     }

//     res.json({ message: "Candidate deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// // UPDATE: Update candidate information
// app.put(
//   "/candidates/:id",
//   upload.fields([{ name: "resume" }, { name: "cover" }]),
//   async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { first_name, last_name, email, phone, linkedin, website } =
//         req.body;

//       const existingCandidate = await client.query(
//         "SELECT * FROM candidates WHERE id = $1",
//         [id]
//       );

//       if (existingCandidate.rows.length === 0) {
//         return res.status(404).send("Candidate not found");
//       }

//       const resume = req.files["resume"]
//         ? req.files["resume"][0].filename
//         : existingCandidate.rows[0].resume;
//       const cover = req.files["cover"]
//         ? req.files["cover"][0].filename
//         : existingCandidate.rows[0].cover;

//       const result = await client.query(
//         "UPDATE candidates SET first_name=$1, last_name=$2, email=$3, phone=$4, linkedin=$5, website=$6, resume=$7, cover=$8 WHERE id=$9 RETURNING *",
//         [
//           first_name,
//           last_name,
//           email,
//           phone,
//           linkedin,
//           website,
//           resume,
//           cover,
//           id,
//         ]
//       );

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// ////////////////////////////////

// app.use("/api/v1", router);

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: "./config/.env" });
import cors from "cors";
import multer from 'multer';
import router from "./router/router.js";
import bodyParser from 'body-parser';
import authRouter from "./router/authRoutes.js";
import fs from 'fs';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

import client from "./config/connectdatabase.js";
app.use("/uploads", express.static("uploads"));

app.use('/auth', authRouter);

///////////Candidates

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//GET Single Data

app.get("/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "SELECT * FROM candidates WHERE candidate_id = $1",
      [id]
    );

    if (!result.rows[0]) {
      return res.status(404).send("Candidate not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// POST: Add a candidate
app.post(
  "/candidates",
  upload.fields([{ name: "resume" }, { name: "cover" }]),
  async (req, res) => {
    try {
      const { first_name, last_name, email, phone, linkedin, website } =
        req.body;

      const resume = req.files["resume"][0].filename;
      const cover = req.files["cover"][0].filename;

      const result = await client.query(
        "INSERT INTO candidates (first_name, last_name, email, phone, linkedin, website, resume, cover) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [first_name, last_name, email, phone, linkedin, website, resume, cover]
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

// GET: Fetch all candidates
app.get("/candidates", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM candidates");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// GET: Fetch a single candidate
app.get("/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "SELECT * FROM candidates WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Candidate not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// DELETE: Remove a candidate
app.delete("/candidates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "DELETE FROM candidates WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Candidate not found");
    }

    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// UPDATE: Update candidate information
app.put(
  "/candidates/:id",
  upload.fields([{ name: "resume" }, { name: "cover" }]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, phone, linkedin, website } =
        req.body;

      const existingCandidate = await client.query(
        "SELECT * FROM candidates WHERE id = $1",
        [id]
      );

      if (existingCandidate.rows.length === 0) {
        return res.status(404).send("Candidate not found");
      }

      const resume = req.files["resume"]
        ? req.files["resume"][0].filename
        : existingCandidate.rows[0].resume;
      const cover = req.files["cover"]
        ? req.files["cover"][0].filename
        : existingCandidate.rows[0].cover;

      const result = await client.query(
        "UPDATE candidates SET first_name=$1, last_name=$2, email=$3, phone=$4, linkedin=$5, website=$6, resume=$7, cover=$8 WHERE id=$9 RETURNING *",
        [
          first_name,
          last_name,
          email,
          phone,
          linkedin,
          website,
          resume,
          cover,
          id,
        ]
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

////////////////////////////////

app.use("/api/v1", router);
// app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});