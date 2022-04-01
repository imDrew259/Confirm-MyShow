const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");
const Theatre = require("../models/theatre");

const router = express.Router();

router.post(
  "/signup-user",
  [
    body("email")
      .isEmail()
      .withMessage("Entered email address is not valid")
      .normalizeEmail()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user)
            return Promise.reject("E-mail already in use. Please Sign In");
        });
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password is not 6 characters long"),
  ],
  authController.signupUser
);

router.put(
  "/login-user",
  [body("email").normalizeEmail()],
  authController.loginUser
);

router.post(
  "/signup-theatre",
  [
    body("email")
      .isEmail()
      .withMessage("Entered email address is not valid")
      .normalizeEmail()
      .custom((value) => {
        return Theatre.findOne({ email: value }).then((theatre) => {
          if (theatre)
            return Promise.reject("E-mail already in use. Please Sign In");
        });
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password is not 6 characters long"),
  ],
  authController.signupTheatre
);

router.put(
  "/login-theatre",
  [body("email").normalizeEmail()],
  authController.loginTheatre
);

router.put(
  "/changepassword-user",
  [body("email").normalizeEmail()],
  authController.changePasswordUser
);

router.put(
  "/changepassword-theatre",
  [body("email").normalizeEmail()],
  authController.changePasswordTheatre
);

module.exports = router;
