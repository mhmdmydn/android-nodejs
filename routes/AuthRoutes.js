const authController = require("./../app/controller/AuthController");
const express = require("express");
const authRoutes = express.Router();

authRoutes.post("/signin", authController.signin);
authRoutes.post("/signup", authController.signup);
authRoutes.get("/logout", authController.logout);

module.exports = authRoutes;



