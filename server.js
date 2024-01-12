const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3000;

// Set up storage for file uploads using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.use(express.static("public"));

// Serve the registration form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/service.html");
});

// Handle form submission
app.post(
  "/register",
  upload.fields([{ name: "aadhar" }, { name: "passbook" }, { name: "pan" }]),
  (req, res) => {
    const fullName = req.body.fullName;
    const dob = req.body.dob;

    // Here you can handle file uploads, verification, and database operations

    res.send("Registration successful!");
  }
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});