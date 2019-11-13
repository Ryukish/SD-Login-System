const Validator = require("Validator");
const isEmpty = require("is-empty");


module.exports = function validate2Roles(data){
    let errors = {};

    data.role = !isEmpty(data.role) ? data.role: "";
    data.rolechange = !isEmpty(data.rolechange) ? data.rolechange: "";
    
    if(Validator.isEmpty(data.role)) {
        errors.role = "Role field is required";
    }
    if(Validator.isEmpty(data.rolechange)) {
        errors.role = "Role to change to field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};