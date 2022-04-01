const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Theatre = require("../models/theatre");

const tokenExpiryTime = 3600; //seconds

const createJWT = (entity, scope) => {
  return jwt.sign(
    {
      id: entity._id.toString(),
      scope,
    },
    process.env.JSON_WebTokenSecretKey,
    { expiresIn: tokenExpiryTime }
  );
};

exports.signupUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid Input");
    error.status = 422;
    error.data = errors.array();
    throw error;
  } else {
    let data = {};
    return bcrypt
      .genSalt(10)
      .then((salt) => {
        return bcrypt.hash(req.body.password, salt).then((hash) => {
          const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hash,
          });
          return user.save();
        });
      })
      .then((user) => {
        data.name = user.name;
        data.scope = "USER";
        const token = createJWT(user, "USER");
        return token;
      })
      .then((token) => {
        data.token = token;
        data.expiresIn = tokenExpiryTime;
        return res.status(201).json({ data, message: "Succesfully added" });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid Input");
    error.status = 422;
    error.data = errors.array();
    next(error);
  } else {
    let data = {};
    const error = new Error("Authentication Failed");
    error.status = 422;
    return User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          error.data = [{ msg: "No user found. Please SignUp instead" }];
          throw error;
        }
        return bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (!result) {
              error.data = [{ msg: "Incorrect Password" }];
              throw error;
            }
            return user;
          });
      })
      .then((user) => {
        data.name = user.name;
        data.scope = "USER";
        return createJWT(user, "USER");
      })
      .then((token) => {
        data.token = token;
        data.expiresIn = tokenExpiryTime;
        return res
          .status(200)
          .json({ data, message: "Successfully Authenticated" });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.signupTheatre = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid Input");
    error.status = 422;
    error.data = errors.array();
    throw error;
  } else {
    let data = {};
    return bcrypt
      .genSalt(10)
      .then((salt) => {
        return bcrypt.hash(req.body.password, salt).then((hash) => {
          const theatre = new Theatre({
            address: req.body.address,
            email: req.body.email,
            name: req.body.name,
            password: hash,
          });
          return theatre.save();
        });
      })
      .then((theatre) => {
        data.name = theatre.name;
        data.scope = "THEATRE";
        const token = createJWT(theatre, "THEATRE");
        return token;
      })
      .then((token) => {
        data.token = token;
        data.expiresIn = tokenExpiryTime;
        return res.status(201).json({ data, message: "Succesfully added" });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.loginTheatre = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid Input");
    error.status = 422;
    error.data = errors.array();
    next(error);
  } else {
    let data = {};
    const error = new Error("Authentication Failed");
    error.status = 422;
    return Theatre.findOne({ email: req.body.email })
      .then((theatre) => {
        if (!theatre) {
          error.data = [{ msg: "No theatre found. Please SignUp instead" }];
          throw error;
        }
        return bcrypt
          .compare(req.body.password, theatre.password)
          .then((result) => {
            if (!result) {
              error.data = [{ msg: "Incorrect Password" }];
              throw error;
            }
            return theatre;
          });
      })
      .then((theatre) => {
        data.name = theatre.name;
        data.scope = "THEATRE";
        return createJWT(theatre, "THEATRE");
      })
      .then((token) => {
        data.token = token;
        data.expiresIn = tokenExpiryTime;
        return res
          .status(200)
          .json({ data, message: "Successfully Authenticated" });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.changePasswordUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((doc) => {
      const error = new Error("Changing Password Failed");
      if (!doc) {
        error.status = 422;
        error.data = [{ msg: "No such user found. Please SignUp Instead" }];
        throw error;
      } else {
        return bcrypt
          .genSalt(10)
          .then((salt) => {
            return bcrypt.hash(req.body.password, salt).then((hash) => {
              doc.password = hash;
              return doc.save();
            });
          })
          .then((doc) => {
            return res
              .status(200)
              .json({ data: "Password got changed successfully" });
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.changePasswordTheatre = (req, res, next) => {
  Theatre.findOne({ email: req.body.email })
    .then((doc) => {
      const error = new Error("Changing Password Failed");
      if (!doc) {
        error.status = 422;
        error.data = [{ msg: "No such theatre found. Please SignUp Instead" }];
        throw error;
      } else {
        return bcrypt
          .genSalt(10)
          .then((salt) => {
            return bcrypt.hash(req.body.password, salt).then((hash) => {
              doc.password = hash;
              return doc.save();
            });
          })
          .then((doc) => {
            return res
              .status(200)
              .json({ data: "Password got changed successfully" });
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};
