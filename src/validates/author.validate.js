const Joi = require('@hapi/joi');

const authorValidate = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'REQUIRED_NAME'
    }),
    note: Joi.string().messages({
        'string.base': 'NOTE_MUST_BE_STRING'
    }),
    nativeCountry: Joi.string().messages({
        'string.base': 'NATIVECOUNTRY_MUST_BE_STRING'
    }),
    penName: Joi.string().messages({
        'string.base': 'PENNAME_MUST_BE_STRING'
    }),
    birthDay: Joi.date().iso().messages({
        'date.base': 'INVALID_DATE',
        'date.strict' : 'INVALID_DATE',
        'date.format' : 'BIRTHDAY_FORMAT_YYYY-MM-DD'
    })
});

module.exports = { authorValidate };