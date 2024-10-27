const { check } = require("express-validator");
const { validate } = require("../../middleware/validationMiddleware");
const config = require('../validation.json');

const validateAuthRegister = config.validateAuthRegister.map(rule => {
    switch (rule.field) {
        case 'firstName':
        case 'lastName':
            return check(rule.field)
                .not()
                .isEmpty()
                .withMessage(rule.errorMessage)
        
        case 'email':
            return check(rule.field)
                .isEmail()
                .withMessage(rule.errorMessage)
        case 'password':
        case 'confirmPassword': // Fixed typo in field name here
            return check(rule.field)
                .isString()
                .isLength({ min: rule.minLength })
                .withMessage(rule.errorMessage);

        default:
            return null; // Return null for unmatched cases
    }
}).filter(Boolean); // Remove any null entries

const validateAuthLogin = config.validateAuthLogin.map(rule => {
    switch (rule.field) {
        case 'email':
            return check(rule.field)
                .isEmail()
                .withMessage(rule.errorMessage)
        case 'password':
            return check(rule.field)
                .isString()
                .isLength({ min: rule.minLength })
                .withMessage(rule.errorMessage);
        default:
            return null; // Return null for unmatched cases
    }
}).filter(Boolean); // Remove any null entries
const AuthRegisterValidation = (req, res, next) => {
    console.log("90000000000000000",req.body)
    return validate(validateAuthRegister)(req, res, next);
};
const AuthLoginValidation = (req, res, next) => {
    console.log("90000000000000000",req.body)
    return validate(validateAuthLogin)(req, res, next);
};

module.exports = { AuthRegisterValidation ,AuthLoginValidation};
