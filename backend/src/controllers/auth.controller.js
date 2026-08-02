import jwt from "jsonwebtoken";
import { iconfig } from "../config/config.js";
import userModel from "../models/users.model.js";

const tokenGenerator = (user) => {
  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    iconfig.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return token;
};

export const registerUser = async (req, res) => {
  const { fullname, contact, password, email, isSeller } = req.body;

  try {
    const user = await userModel.findOne({ $or: [{ email }, { contact }] });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await userModel.create({
      fullname,
      contact,
      password,
      email,
      role: isSeller ? "seller" : "buyer",
    });

    const token = tokenGenerator(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = tokenGenerator(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;

    console.log("Google user:", user);

    res.redirect("http://localhost:5173/home");
  } catch (error) {
    console.error("Error in Google auth callback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
