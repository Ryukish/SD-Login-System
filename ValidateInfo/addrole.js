const Validator = require("Validator");
const isEmpty = require("is-empty");
const Role = require("../models/Role");

module.exports = function validateRoleLinks(data){
    let errors = {};

    data.role = !isEmpty(data.role) ? data.role: "";
    data.links = !isEmpty(data.links) ? data.links: "";

    if(Validator.isEmpty(data.role)) {
        errors.role = "Role field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};