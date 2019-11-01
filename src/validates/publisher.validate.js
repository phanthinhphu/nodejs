const Joi = require('@hapi/joi');

const publisherValidate = Joi.object({
    name: Joi.string().required().empty().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'REQUIRED_NAME',
        'string.empty': 'EMPTY_NAME'
    }),
    address: Joi.string().required().empty().messages({
        'string.base': 'ADDRESS_MUST_BE_STRING',
        'any.required': 'REQUIRED_ADDRESS',
        'string.empty': 'EMPTY_ADDRESS'
    }),
    email: Joi.string().email().empty().required().messages({
        'string.email': 'INVALID_EMAIL',
        'any.required': 'REQUIRED_EMAIL',
        'string.empty': 'EMPTY_EMAIL'
    }),
    books: Joi.string()
});

module.exports = { publisherValidate }; 