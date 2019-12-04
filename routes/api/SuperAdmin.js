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
  Role.findOne({ role: req.body.role.toUpperCase()}).then(returnedRole => {
    if(!returnedRole){
      return res.status(400).json({role:"Role is not created"});
    }
  });
  User.findOne({ email: req.body.email}).then(returnedUser => {
    if (!returnedUser) {
        return res.status(404).json({email :"Email has not been found"});
    }
    else {
      returnedUser.role = req.body.role.toUpperCase();
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

  Role.findOne({ role: req.body.role.toUpperCase()}).then(returnedRole => {
    if(returnedRole){
      return res.status(400).json({role:"Role is already created"});
    }
    else {
      const newRole = new Role({
        role: req.body.role.toUpperCase(),
        links: req.body.links
      });
      newRole.save().then(role => res.json(role)).catch(theError => console.log(theError));
    }
  });
  
});

router.post("/deleterole", async (req, res) => {
  //give role name delete role
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  if (req.body.role.toUpperCase() === 'BASIC'){
    return res.status(400).json({role:"You can't delete the Basic Role"})
  }
  if (req.body.role.toUpperCase() === 'SUPERADMIN'){
    return res.status(400).json({role:"You can't delete the Basic Role"})
  }
  await Role.deleteOne({ role: req.body.role.toUpperCase() }).then(role => res.json(role)).catch(theError => console.log(theError));
  await User.updateMany({ role: req.body.role }, { role: "BASIC"}).catch(theError => console.log(theError));
});

router.post("/modrole", (req, res) => {
  const { errors, isValid} = validate2Roles(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  if (req.body.role.toUpperCase() === 'BASIC'){
    return res.status(400).json({role:"You can't rename the BASIC Role"})
  }
  if (req.body.role.toUpperCase() === 'SUPERADMIN'){
    return res.status(400).json({role:"You can't rename the superadmin Role"})
  }
  Role.findOne({ role: req.body.rolechange.toUpperCase()}).then(returnedRoleChange => {
    if(returnedRoleChange){
      return res.status(400).json({role:"Role name already Taken"});
    }
  Role.findOne({ role: req.body.role.toUpperCase()}).then(returnedRole => {
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    else{
      returnedRole.role = req.body.rolechange.toUpperCase();
      returnedRole.markModified('role');
      returnedRole.save().then(role => res.json(role)).catch(theError => console.log(theError));
      }
    });
  });
  if(res.role === req.body.role){
    return res.status(400).json({role:"Name change has failed", role:"Name change has failed"});
  }
  return res
});

router.post("/linksofrole", (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  Role.findOne({ role: req.body.role.toUpperCase()}).then(returnedRole => {
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    else{
      Role.findOne({ role: req.body.role.toUpperCase()}).then(role => res.json(role)).catch(theError => console.log(theError));
    }
  });
});

router.post("/addlinks", async (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }     

  returnedRole = await Role.findOne({ role: req.body.role.toUpperCase()})
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    else{
      await Role.updateOne({role : req.body.role.toUpperCase()}, {$addToSet: {links : req.body.links}}).catch(theError => console.log(theError));       
    } 
  await Role.findOne({ role: req.body.role.toUpperCase()}).then(ret => res.json(ret));
});

router.post("/deletelinks", async (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  returnedRole = await Role.findOne({ role: req.body.role.toUpperCase()})
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    else{     
      await Role.updateOne({role : req.body.role.toUpperCase()}, {$pullAll : {links : req.body.links}}).catch(theError => console.log(theError));
    }
  await Role.findOne({ role: req.body.role.toUpperCase()}).then(ret => res.json(ret));
});

router.post("/modlinks", async (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  returnedRole = await Role.findOne({ role: req.body.role.toUpperCase()})
  if(!returnedRole){
    return res.status(400).json({role:"Role not found"});
    }
  else{ 
    if(req.body.linksnew===[]){
    }
    else{
      await Role.updateOne({role : req.body.role.toUpperCase()}, {$pullAll: {links : req.body.links}});
    }
    if(req.body.linksnew===[]){
    }
    else{
      await Role.updateOne({role : req.body.role.toUpperCase()}, {$addToSet: {links : req.body.linksnew}}).catch(theError =>res.status(400).json({role:"You must provide links to rename"}));
    }
    var ai = await Role.findOne({ role: req.body.role.toUpperCase()});
    return res.json({role : ai.role, links:ai.links});
  }
});


router.post("/lou",async (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  var returnedRole;
  returnedRole = await Role.findOne({ role: req.body.role.toUpperCase()}).catch(theError =>res.status(400).json({role:"You must provide links to rename"}));
  if(!returnedRole){
    return res.status(400).json({role:"Role not found"});
  }
  else{
    var role;
    role = await Role.findOne({ role: req.body.role.toUpperCase()})
    var i;
    var al=[];
    var ai;
    var n = role.links.length;
    for(i = 0; i<n; i++){
      if(role.links[i]){
        if(role.links[i].includes("!")){
          role.links[i]=role.links[i].replace("!","");
          ai = await Role.findOne({ role: role.links[i].toUpperCase()})
          role.links[i] ="null";
        }
      }
    }
    if(ai){
      al=al.concat(ai.links);
    }
    al=al.concat(role.links);
    return res.json(al);
  }
    
});

module.exports =router;