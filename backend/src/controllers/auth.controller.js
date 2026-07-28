import jwt from "jsonwebtoken";
import { iconfig } from "../config/config.js";

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
