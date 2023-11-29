const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");

const users = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "UserSchema.js"
));
const { isStrongPassword } = require(path.join(
  __dirname,
  "..",
  "AdditionalFunctions",
  "index.js"
));

router.post("/login", async (req, res) => {
  try {
    const { metamaskID, password } = req.body;

    if (metamaskID && password) {
      const user = await users.findOne({ metamaskID });

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          res.json({ status: "success", message: "Login successful." });
        } else {
          res
            .status(401)
            .json({ status: "failure", message: "Incorrect password." });
        }
      } else {
        res.status(401).json({ status: "failure", message: "User not found." });
      }
    } else {
      res.status(400).json({
        status: "invalid request",
        message: "Invalid request format.",
      });
    }
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { companyName, metamaskID, password, confirmPassword } = req.body;

    if (companyName && metamaskID && password && confirmPassword) {
      // Check for strong password
      const isPasswordStrong = isStrongPassword(password);

      if (!isPasswordStrong) {
        return res.status(400).json({
          status: "failure",
          message: "Password does not meet strength requirements.",
        });
      }

      const existingUser = await users.findOne({ metamaskID });

      if (existingUser) {
        return res
          .status(409)
          .json({ status: "failure", message: "User already exists." });
      }

      if (password === confirmPassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await users.create({
          companyName,
          metamaskID,
          password: hashedPassword,
        });
        res.json({
          status: "success",
          message: "User created successfully.",
        });
      } else {
        res
          .status(400)
          .json({ status: "failure", message: "Passwords do not match." });
      }
    } else {
      res.status(400).json({
        status: "invalid request",
        message: "Invalid request format.",
      });
    }
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
