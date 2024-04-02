import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
const JWT_SECRET = "abcdefghigklmnopqrstwxyz";

const protectRoutes = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json("you must be login");
      }
      const token = authorization.replace("Bearer ", "");
   // const token = req.cookies.jwt;
     //console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    // console.log(req.user);
    //console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protectRoute", error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};


 export default protectRoutes;

// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
// import { jwt_secret } from "../keys.js";
// import Usermodel from "../Models/module.js";

// export const requiredLogin = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res.status(401).json("you must be login");
//   }
//   const token = authorization.replace("Bearer ", "");
//   jwt.verify(token, jwt_secret, (err, payload) => {
//     if (err) {
//       return res.status(401).json("you must be login2");
//     }
//     const { _id } = payload;
//     Usermodel.findById(_id).then((user) => {
//       // console.log(user);
//       req.user = user;
//       next();
//     });
//   });
// };
