import jwt from "jsonwebtoken";
import { iconfig } from "../config/config.js";
import userModel from "../models/users.model.js";

export const authenticateSeller = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, iconfig.JWT_SECRET);
    const user = await userModel.findById(decode.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role !== "seller") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    console.log(error);
  }
};

export const authenticateUser = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.cookies.token, iconfig.JWT_SECRET);
    const user = await userModel.findById(decode.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
