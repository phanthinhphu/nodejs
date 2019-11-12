const Joi = require('@hapi/joi');

const authorValidate = Joi.object({
    name: Joi.string().required().empty().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'REQUIRED_NAME',
        'string.empty': 'EMPTY_NAME'
    }),
    note: Joi.string().empty('').messages({
        'string.base': 'NOTE_MUST_BE_STRING'
    }),
    nativeCountry: Joi.string().empty('').messages({
        'string.base': 'NATIVECOUNTRY_MUST_BE_STRING'
    }),
    penName: Joi.string().empty('').messages({
        'string.base': 'PENNAME_MUST_BE_STRING'
    }),
    birthDay: Joi.date().iso().required().messages({
        'date.base': 'INVALID_DATE',
        'date.strict' : 'INVALID_DATE',
        'date.format' : 'BIRTHDAY_FORMAT_YYYY-MM-DD',
        'any.required' : 'REQUIRED_BIRTHDAY'
    })
});

module.exports = { authorValidate };