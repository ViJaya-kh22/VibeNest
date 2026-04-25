const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {
  // ✅ Check cookie first, then Authorization header as fallback
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "You don't have access to create music" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in authmiddleware : ", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in authUser", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {authArtist , authUser}