const Joi = require('@hapi/joi');

const typeBookValidate = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'NAME_IS_REQUIRED'
    }),
    book: Joi.string()
});

module.exports = { typeBookValidate };