const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const keys = require("../../config/Url&Keys");
const validateRegisterInput = require("../../validateInfo/Register");
const validateLoginInput = require("../../validateInfo/Login");
const User = require("../../models/User");
const rateLimit = require("express-rate-limit");

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne( { email:req.body.email }).then(returnedValues => {
          if (returnedValues) {
              return res.status(400).json({ email: "Account already exists"});
          }
    });
    const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role
    });
    bcrypt.genSalt(10, (theError, salt) => {
          bcrypt.hash(newUser.password, salt, (theError, hash) => {
            if (theError) throw theError;
            newUser.password = hash;
            newUser.save().then(user => res.json(user)).catch(theError => console.log(theError));
          });
    });
      
  });

module.exports =router;