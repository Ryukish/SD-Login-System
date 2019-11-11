const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const keys = require("../../config/Url&Keys");
const validateEmailRole = require("../../validateInfo/Assignrole");
const validateRoleLinks = require("../../validateInfo/addrole");
const User = require("../../models/User");
const Role = require("../models/Role");

router.post("/assignrole", (req, res) => {
  const { errors, isValid} = validateEmailRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }       
  User.findOne({ email: req.body.email}).then(returnedUser => {
    if (!returnedUser) {
        return res.status(404).json({EmailHasNotBeenRegistered: "Email has not been found"});
    }
    else {
      returnedUser.role = req.body.role.toLowerCase();
      returnedUser.markModified('role');
      returnedUser.save(err => console.log(err));
    }
  });
});

router.post("/addrole", (req, res) => {
  //New Role name, and links 
  const { errors, isValid} = validateRoleLinks(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }       
  const newRole = new Role({
    role: req.body.role,
    links: req.body.links
  });
  newRole.save().then(role => res.json(role)).catch(theError => console.log(theError));
});

router.post("/deleterole", (req, res) => {
  //give role name delete role
  //Change anyone with role to Basic
});
router.post("/modrole", (req, res) => {
  //Change an existing role
});
router.post("/links", (req, res) => {
  //given role
  //
});

module.exports =router;