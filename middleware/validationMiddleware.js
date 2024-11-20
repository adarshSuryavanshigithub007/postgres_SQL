const { validationResult } = require("express-validator");

const validate = (validation) => {
    console.log("validation-=========",validation)
    return async (req, res, next) => {
        try {
            // Run all validation rules
            await Promise.all(validation.map((validation) => validation.run(req)));
        } catch (err) {
            console.error(`Validation error: ${err.message}`);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Get validation results
        const errors = validationResult(req);
console.log("errors--------------",errors)
        if (errors.isEmpty()) {
            return next();
        }

        // Format and return errors if any
        const formattedError = errors.array().reduce((acc, error) => {
            acc[error.param] = error.msg;  // Use `param` for field name
            return acc;
        }, {});

        res.status(400).json({
            error: formattedError,
            message: "The given data was invalid",
        });
    };
};


module.exports = {
    validate
}