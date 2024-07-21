const routes = require("express").Router();
const { registerUser, loginUser } = require("../controller/authController");


routes.post("/register", registerUser);

routes.post("/login", loginUser);


module.exports = routes