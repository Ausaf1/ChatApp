const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { authToken } = req.cookies;
  if (authToken) {
    const decodedToken = await jwt.verify(authToken, process.env.JWT_SECRET);
    req.myId = decodedToken.id;
    next();
  } else {
    res.status(401).json({
      error: {
        errorMessage: ["Please Login"],
      },
    });
  }
};
