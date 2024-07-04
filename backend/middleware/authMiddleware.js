const User = require("../models/User");
const { verifyToken } = require("../utils/utility.function");
const { sendResponseError } = require("../middleware/middleware");

const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    sendResponseError(401, "You are not authorized1", res);
    return;
  } else if (!authorization.startsWith("Bearer ")) {
    sendResponseError(401, "You are not authorized2", res);
    return;
  }

  try {
    const payload = await verifyToken(authorization.split(" ")[1]);
    console.log(payload);
    if (payload) {
      const user = await User.findById(payload.id, { password: 0 });

      if (user.role === "user") {
        req["user"] = user;
      }

      next();
    } else {
      sendResponseError(401, `you are not authorizeed`, res);
    }
  } catch (err) {
    console.log("Error ", err);
    sendResponseError(400, `Error ${err.message}`, res);
  }
};

const verifyAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    sendResponseError(401, "You are not authorized ", res);
    return;
  } else if (!authorization.startsWith("Bearer ")) {
    sendResponseError(401, "You are not authorized ", res);
    return;
  }

  try {
    const payload = await verifyToken(authorization.split(" ")[1]);
    console.log(payload);
    if (payload) {
      const user = await User.findById(payload.id, { password: 0 });

      if (user.role === "admin") {
        req["admin"] = user;
      }

      next();
    } else {
      sendResponseError(401, `you are not authorizeed`, res);
    }
  } catch (err) {
    console.log("Error ", err);
    sendResponseError(400, `Error ${err.message}`, res);
  }
};

const verifyRider = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    sendResponseError(401, "You are not authorized ", res);
    return;
  } else if (!authorization.startsWith("Bearer ")) {
    sendResponseError(401, "You are not authorized ", res);
    return;
  }

  try {
    const payload = await verifyToken(authorization.split(" ")[1]);
    console.log(payload);
    if (payload) {
      const user = await User.findById(payload.id, { password: 0 });

      if (user.role === "rider") {
        req["rider"] = user;
      }

      next();
    } else {
      sendResponseError(401, `you are not authorizeed`, res);
    }
  } catch (err) {
    console.log("Error ", err);
    sendResponseError(400, `Error ${err.message}`, res);
  }
};

const verifySuperAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    sendResponseError(401, "You are not authorized ", res);
    return;
  } else if (!authorization.startsWith("Bearer ")) {
    sendResponseError(401, "You are not authorized ", res);
    return;
  }

  try {
    const payload = await verifyToken(authorization.split(" ")[1]);
    console.log(payload);
    if (payload) {
      const user = await User.findById(payload.id, { password: 0 });

      if (user.role === "superAdmin") {
        req["superAdmin"] = user;
      }

      next();
    } else {
      sendResponseError(401, `you are not authorizeed`, res);
    }
  } catch (err) {
    console.log("Error ", err);
    sendResponseError(400, `Error ${err.message}`, res);
  }
};

module.exports = {
  verifyUser,
  verifyAdmin,
  verifyRider,
  verifySuperAdmin,
};
