const Validator = require("Validator");
const isEmpty = require("is-empty");

module.exports = function validateEmailRole(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email: "";
    data.role = !isEmpty(data.role) ? data.role: "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if(Validator.isEmpty(data.role)) {
        errors.role = "Role field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};