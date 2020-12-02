const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const router = express.Router();
const signUp = require("../db/model");


require("dotenv").config({ path: "../" });

const schema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_]+$"))
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@_-]+$"))
    .min(8)
    .max(30)
    .required(),
});

function createTokenSendResponse(user, res, next) {
  const playload = {
    _id: user._id,
    username: user.username,
  };

  jwt.sign(
    playload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1d",
    },
    (err, token) => {
      if (err) {
        console.log("new error");
        respondError422(res, next);
      } else {
        res.json({ token });
      }
    }
  );
}


// any route in here is pre-pended with /auth

router.get("/", (req, res) => {
  res.json({
    message: "🔐",
  });
});

router.post("/signup", (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error == null) {
    signUp
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          const error = new Error("The username already exist!");
          res.status(406);
          next(error);
        } else {
          bcrypt.hash(req.body.password, 12).then(async (hashedPassword) => {
            const signupData = new signUp({
              username: req.body.username,
              password: hashedPassword,
            });

            await signupData.save().then((signupResult) => {
              createTokenSendResponse(signupResult, res, next);
            });
          });
        }
      });
  } else {
    res.status(422);
    next(result.error);
  }
});

function respondError422(res, next) {
  res.status(422);
  const error = new Error("Unable to Login");
  next(error);
}

router.post("/signin", (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error == null) {
    signUp
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          console.log(`Comparing....${req.body.password} with hash....`);
          bcrypt.compare(req.body.password, user.password).then((result) => {
            if (result) {
              createTokenSendResponse(user, res, next);
            } else {
              respondError422(res, next);
            }
          });
        } else {
          respondError422(res, next);
        }
      });
  } else {
    respondError422(res, next);
  }
});

module.exports = router;
