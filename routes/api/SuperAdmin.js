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
        return res.status(404).json({email :"Email has not been found"});
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
    else {
      const newRole = new Role({
        role: req.body.role.toLowerCase(),
        links: req.body.links
      });
      newRole.save().then(role => res.json(role)).catch(theError => console.log(theError));
    }
  });
  
});

router.post("/deleterole", (req, res) => {
  //give role name delete role
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  if (req.body.role.toLowerCase() === 'basic'){
    return res.status(400).json({role:"You can't delete the Basic Role"})
  }
  Role.deleteOne({ role: req.body.role.toLowerCase() }).then(role => res.json(role)).catch(theError => console.log(theError));
  User.updateMany({ role: req.body.role }, { role: "basic"}).then(role => res.json(role)).catch(theError => console.log(theError));
});

router.post("/modrole", (req, res) => {
  const { errors, isValid} = validate2Roles(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  if (req.body.role.toLowerCase() === 'superadmin'){
    return res.status(400).json({role:"You can't rename the superadmin Role"})
  }
  Role.findOne({ role: req.body.rolechange.toLowerCase()}).then(returnedRoleChange => {
    if(returnedRoleChange){
      return res.status(400).json({role:"Role name already Taken"});
    }
  Role.findOne({ role: req.body.role.toLowerCase()}).then(returnedRole => {
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    else{
      returnedRole.role = req.body.rolechange.toLowerCase();
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
  Role.findOne({ role: req.body.role.toLowerCase()}).then(returnedRole => {
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    else{
      Role.findOne({ role: req.body.role.toLowerCase()}).then(role => res.json(role)).catch(theError => console.log(theError));
    }
  });
});

router.post("/addlinks", async (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }     

  returnedRole = await Role.findOne({ role: req.body.role.toLowerCase()})
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    else{
      await Role.updateOne({role : req.body.role.toLowerCase()}, {$addToSet: {links : req.body.links}}).catch(theError => console.log(theError));       
    } 
  await Role.findOne({ role: req.body.role.toLowerCase()}).then(ret => res.json(ret));
});

router.post("/deletelinks", async (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  returnedRole = await Role.findOne({ role: req.body.role.toLowerCase()})
    if(!returnedRole){
      return res.status(400).json({role:"Role not found"});
    }
    else{     
      await Role.updateOne({role : req.body.role.toLowerCase()}, {$pullAll : {links : req.body.links}}).catch(theError => console.log(theError));
    }
  await Role.findOne({ role: req.body.role.toLowerCase()}).then(ret => res.json(ret));
});

router.post("/modlinks", async (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  returnedRole = await Role.findOne({ role: req.body.role.toLowerCase()})
  if(!returnedRole){
    return res.status(400).json({role:"Role not found"});
    }
  else{ 
    if(req.body.linksnew===[]){
    }
    else{
      await Role.updateOne({role : req.body.role.toLowerCase()}, {$pullAll: {links : req.body.links}});
    }
    if(req.body.linksnew===[]){
    }
    else{
      await Role.updateOne({role : req.body.role.toLowerCase()}, {$addToSet: {links : req.body.linksnew}}).catch(theError =>res.status(400).json({role:"You must provide links to rename"}));
    }
    var ai = await Role.findOne({ role: req.body.role.toLowerCase()});
    return res.json({role : ai.role, links:ai.links});
  }
});


router.post("/lou",async (req, res) => {
  const { errors, isValid} = validateRole(req.body);
  if (!isValid){
      return res.status(400).json(errors);
  }
  var returnedRole;
  returnedRole = await Role.findOne({ role: req.body.role.toLowerCase()}).catch(theError =>res.status(400).json({role:"You must provide links to rename"}));
  if(!returnedRole){
    return res.status(400).json({role:"Role not found"});
  }
  else{
    var role;
    role = await Role.findOne({ role: req.body.role.toLowerCase()})
    var i;
    var al=[];
    var ai;
    var n = role.links.length;
    for(i = 0; i<n; i++){
      if(role.links[i]){
        if(role.links[i].includes("!")){
          role.links[i]=role.links[i].replace("!","");
          ai = await Role.findOne({ role: role.links[i]})
          role.links[i] ="null";
        }
      }
    }
    if(ai){
      al=al.concat(ai.links);
    }
    al=al.concat(role.links);
    console.log(al)

    return res.json(al);
  }
    
});

module.exports =router;