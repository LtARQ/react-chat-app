import User from "../models/user.model.js";

export const getUserToSidebar = async (req, res) => {
  try {
    const loginUserId = req.user._id;
    const filterUser = await User.find({ _id: { $ne: loginUserId } }).select(
      "-password"
    );
    res.status(200).json(filterUser);
  } catch (error) {
    console.log("Erroe from getUserToSidebar controller:", error);
    res.status(500).json({ error: "Internal server error:" });
  }
};
