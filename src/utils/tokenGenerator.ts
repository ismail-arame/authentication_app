// npm i jsonwebtoken && npm i --save-dev @types/jsonwebtoken
import jwt from "jsonwebtoken";

// ! => is a non null assertion and it is used when you know that a value cannot be null or undefind
// in our case we know that the value of both secrets in on the .env file
const { LOGIN_TOKEN_SECRET, ACTIVATION_TOKEN_SECRET, RESET_TOKEN_SECRET } =
  process.env;

export function createLoginToken(payload: any) {
  return jwt.sign(payload, LOGIN_TOKEN_SECRET!, { expiresIn: "7d" });
}

export function createActivationToken(payload: any) {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET!, { expiresIn: "3d" });
}

export function createResetToken(payload: any) {
  return jwt.sign(payload, RESET_TOKEN_SECRET!, { expiresIn: "3h" });
}
