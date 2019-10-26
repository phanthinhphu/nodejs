const Joi = require('@hapi/joi');

const authorValidate = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'NAME_IS_REQUIRED'
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
    birthDay: Joi.date().messages({
        'date.base': 'INVALID_DATE'
    })
});

module.exports = { authorValidate };