const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const keys = require("../../config/Url&Keys");
const validateEmailRole = require("../../validateInfo/Assignrole");
const validateRole = require("../../ValidateInfo/CheckRole");
const User = require("../../models/User");
const Role = require("../../models/Role");

router.post("/assignrole", (req, res) => {
  const { errors, isValid} = validateEmailRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  Role.findOne({ role: req.body.role.toLowerCase()}).then(returnedRole => {
    if(!returnedRole){
      return res.status(400).json({role:"Role is not created"});
    }
  });
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
  
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }       

  Role.findOne({ role: req.body.role.toLowerCase()}).then(returnedRole => {
    if(returnedRole){
      return res.status(400).json({role:"Role is already created"});
    }
  });
  const newRole = new Role({
    role: req.body.role.toLowerCase(),
    links: req.body.links
  });
  newRole.save().then(role => res.json(role)).catch(theError => console.log(theError));
});

router.post("/deleterole", (req, res) => {
  //give role name delete role
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }       
  Role.deleteOne({ role: req.body.role.toLowerCase() }).then(role => res.json(role)).catch(theError => console.log(theError));
  User.updateMany({ role: req.body.role }, { role: "basic"}).then(role => res.json(role)).catch(theError => console.log(theError));
});


router.post("/modrole", (req, res) => {
  Role.findOne({ role: req.body.role.toLowerCase()}).then(returnedRole => {
    if(!returnedRole){
      return res.status(400).json({role:"Role is invalid"});
    }
    else {
      returnedUser.role = req.body.role.toLowerCase();
      returnedUser.markModified('role');
      returnedUser.save(err => console.log(err));
    }
  });
});



router.post("/addlinks", (req, res) => {
  //given role, add links 
  //
});

router.post("/deletelinks", (req, res) => {
  //given role, add links 
  //
});

router.post("/modlinks", (req, res) => {
  //given role, add links 
  //
});

module.exports =router;