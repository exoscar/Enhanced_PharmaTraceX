const path = require("path");
const jwtService = require(path.join(
  __dirname,
  "..",
  "Security",
  "jwtAuth.js"
));

async function verifyTokenMiddleware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ status: "failure", message: "No token provided." });
  }
  try {
    const decoded = await jwtService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in verifyTokenMiddleware:", error);
    res.status(401).json({ status: "failure", message: "Invalid token." });
  }
}

module.exports = { verifyTokenMiddleware };
