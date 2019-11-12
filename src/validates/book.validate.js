const Joi = require('@hapi/joi');

const bookValidate = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'REQUIRED_NAME',
    }),
    datePublish: Joi.date().iso().required().messages({
        'date.base': 'INVALID_DATEPUBLISH',
        'date.format' : 'DATEPUBLISH_FORMAT_YYYY-MM-DD',
        'any.required': 'REQUIRED_DATEPUBLISH'
    }),
    price: Joi.number().required().less(100000000).greater(0).messages({
        'number.base': 'PRICE_MUST_BE_NUMBER',
        'number.greater': 'PRICE_MUST_BE_GREATER_THAN_0',
        'number.less': 'PRICE_MUST_BE_LESS_THAN_100000000',
        'any.requuired' : 'REQUIRED_PRICE'
    }),
    status: Joi.boolean(),
    author : Joi.string()
});

module.exports = { bookValidate }