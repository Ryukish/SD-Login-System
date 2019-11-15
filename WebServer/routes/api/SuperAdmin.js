const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const keys = require("../../config/Url&Keys");
const validateEmailRole = require("../../validateInfo/Assignrole");
const validateRole = require("../../ValidateInfo/CheckRole");
const validate2Roles = require("../../ValidateInfo/Check2Roles");
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
      returnedUser.save().then(user => res.json(user)).catch(theError => console.log(theError));
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
  const { errors, isValid} = validate2Roles(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }     
  Role.findOne({ role: req.body.rolechange.toLowerCase()}).then(returnedRoleChange => {
    if(returnedRoleChange){
      return res.status(400).json({rolechange:"Role name already Taken"});
    }
  Role.findOne({ role: req.body.role.toLowerCase()}).then(returnedRole => {
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    returnedRole.role = req.body.rolechange.toLowerCase();
    returnedRole.markModified('role');
    returnedRole.save().then(role => res.json(role)).catch(theError => console.log(theError));
    });
  });
  return req
});

router.post("/linksofrole", (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }     
  Role.findOne({ role: req.body.role.toLowerCase()}).then(role => res.json(role)).catch(theError => console.log(theError));
});

router.post("/addlinks", (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }     
  Role.update({role : req.body.role.toLowerCase()}, {$addToSet: {links : req.body.links}}).then(role => res.json(role)).catch(theError => console.log(theError));
});

router.post("/deletelinks", (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }     
  Role.update({role : req.body.role.toLowerCase()}, {$pullAll : {links : req.body.links}}).then(role => res.json(role)).catch(theError => console.log(theError));
});

router.post("/modlinks", (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }     
  Role.update({role : req.body.role.toLowerCase()}, {$pullAll : {links : req.body.links}});
  Role.update({role : req.body.role.toLowerCase()}, {$push: {links : req.body.links}}).then(role => res.json(role)).catch(theError => console.log(theError));
});

module.exports =router;