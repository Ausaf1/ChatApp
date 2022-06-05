const User = require("../models/authModel");

module.exports.getFriends = async (req, res) => {
  try {
    const friendGet = await User.find({});
    res.status(200).json({
      success: true,
      friends: friendGet,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};