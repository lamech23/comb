const isAdmin = (req, res, next) => {
  try {
    // Retrieve the user's access token from the request
    const accessToken = req.user;
    // Extract the user ID from the access token
    const roles = accessToken.userId.roles;

    // Check if the user has the "admin" role
    if (roles.includes("admin")) {
      next();
    } else {
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ error: "Invalid token" });
  }
};

const isLandOwner = (req, res, next) => {
  try {
    // Retrieve the user's access token from the request
    const accessToken = req.user;
    // Extract the user ID from the access token
    const roles = accessToken.userId.roles;

    // Check if the user is verified
    if (roles.includes("landOwner")) {
      next();
    } else {
      res.status(403).send({
        message: "User is not verified!",
      });
    }
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ error: "Invalid token" });
  }
};

const isTenant = (req, res, next) => {
  try {
    // Retrieve the user's access token from the request
    const accessToken = req.user;
    // Extract the user ID from the access token
    const roles = accessToken.userId.roles;

    // Check if the user is an artist
    if (roles.includes("tenant")) {
      next();
    } else {
      res.status(403).send({
        message: "User is not an tenant!",
      });
    }
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { isAdmin, isLandOwner, isTenant };
