const Validator = require("Validator");
const isEmpty = require("is-empty");


module.exports = function validateRole(data){
    let errors = {};

    data.role = !isEmpty(data.role) ? data.role: "";
    
    if(Validator.isEmpty(data.role)) {
        errors.role = "Role field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};