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

router.post("/login", (req, res) => {

  const { errors, isValid} = validateLoginInput(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }

  const password = req.body.password;
  
  User.findOne({ email: req.body.email}).then(returnedValue => {
      if (!returnedValue) {
          return res.status(404).json({EmailHasNotBeenRegistered: "Email has not been found"});
      }
      
  
    bcrypt.compare(password, returnedValue.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: returnedValue.id,
            name: returnedValue.name
          };
          jwt.sign(payload,
            keys.sk,{ expiresIn: 31556926 }, 
            (err, token) => { 
              res.json({
                success: true,
                token: "Bearer " + token,
                role: returnedValue.role
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
    });
  });
});


module.exports =router;