const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");


router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/auth", UserController.authUser);
router.get("/user/:id", UserController.getUser);

module.exports = router;