const Joi = require('@hapi/joi');

const readerValidate = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'NAME_IS_REQUIRED'
    }),
    address: Joi.string().required().messages({
        'string.base': 'ADDRESS_MUST_BE_sTRING',
        'any.required': 'ADDRESS_IS_REQUIRED'
    }),
    birthDay: Joi.date().iso().required().messages({
        'date.base': 'BIRTHDAY_INVALID',
        'any.Required': 'BIRTHDAY_IS_REQUIRED',
        'date.format': 'BIRTHDAT_FORMAT_YYYY_MM_DD'
    }),
    phone: Joi.string().pattern(/^[0-9]+$/).min(5).max(10).messages({
        'string.pattern.base': 'PHONE_INVALID',
        'string.min': 'PHONE_MIN_LENGTH_5',
        'string.max': 'PHONE_MAX_LENGTH_10'
    })
});

module.exports = { readerValidate };