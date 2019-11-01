const Joi = require('@hapi/joi');

const UserValidate = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'REQUIRED_NAME',
    }),
    birthDay: Joi.date().required().iso().messages({
        'string.format': 'BIRTHDAY_FORMAT_YYYY_MM_DD',
        'any.required': 'REQUIRED_BIRTHDAY'
    }),
    phone: Joi.string().pattern(/^[0-9]+$/).min(5).max(10).messages({
        'string.pattern.base': 'PHONE_INVALID',
        'string.min': 'PHONE_MIN_LENGTH_5',
        'string.max': 'PHONE_MAX_LENGTH_10'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'INVALID_EMAIL',
        'any.required': 'REQUIRED_EMAIL'
    }),
    password: Joi.string().min(10).max(50).messages({
        'string.min': 'PASSWORD_MIN_LENGTH_10_CHARACTER',
        'string.max': 'PASSWORD_MAX_LENGTH_50_CHARACTER'
    })
});

module.exports = { UserValidate };