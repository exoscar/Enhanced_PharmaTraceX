const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

const secret = process.env.JWT_SECRET || "me";

function generateToken(payload) {
  return signAsync(payload, secret);
}

async function verifyToken(token) {
  try {
    const decoded = await verifyAsync(token, secret);
    return decoded;
  } catch (error) {
    throw new Error("Invalid Token");
  }
}

module.exports = { generateToken, verifyToken };
