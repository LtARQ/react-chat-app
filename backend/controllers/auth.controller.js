import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const passwordCheck = await bcrypt.compare(password, user?.password || "");
    if (!user || !passwordCheck) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      gender: user.gender,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in login controller: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
export const signup = async (req, res) => {
  try {
    const { fullname, username, password, gender, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    // Profile picture
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashpassword,
      gender,
      profilePicture: gender === "Male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res
        .status(400)
        .json({ message: "Error: User not created invaled user data." });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.log("Error in logout controller: ", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
