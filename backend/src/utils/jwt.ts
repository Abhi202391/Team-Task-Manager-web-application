// utils/jwt.ts

import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

//////////////////////////////////////////////////////
// GENERATE ACCESS TOKEN
//////////////////////////////////////////////////////

export const generateAccessToken = (
  payload: JwtPayload
) => {

  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

//////////////////////////////////////////////////////
// VERIFY ACCESS TOKEN
//////////////////////////////////////////////////////

export const verifyAccessToken = (
  token: string
) => {

  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );
};