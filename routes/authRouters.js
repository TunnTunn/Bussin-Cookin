//routes/authRouters.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { checkUser } = require("../middleware/authMiddleware");

// router.all("/*", (req, res, next) => {
//     req.app.local.layout = "default";
//     next();
// });

router.get("/sign-in", authController.showSignIn);
router.post("/sign-in", checkUser, authController.authenticate);

router.get("/sign-up", authController.showSignUp);
router.post("/sign-up", authController.createUser);

router.get("/log-out", authController.logOut);

router.post("/reset-password", authController.resetPassword);

router.get("/reset-password", authController.showResetPassword);

module.exports = router;
