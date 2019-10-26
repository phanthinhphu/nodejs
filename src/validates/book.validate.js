const Joi = require('@hapi/joi');

const bookValidate = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'NAME_MUST_BE_STRING',
        'any.required': 'NAME_IS_REQUIRED',
    }),
    datePublish: Joi.date().required().messages({
        'date.base': 'INVALID_DATEPUBLISH',
        'any.required': 'DATEPUBLISH_IS_REQUIRED'
    }),
    price: Joi.number().required().less(100000000).greater(0).messages({
        'number.base': 'PRICE_MUST_BE_NUMBER',
        'number.greater': 'PRICE_MUST_BE_GREATER_THAN_0',
        'number.less': 'PRICE_MUST_BE_LESS_THAN_100000000'
    }),
    author : Joi.string().required().messages({
        'string.base' : 'INVALID_AUTHOR',
        'any.required' : 'AUTHOR_IS_REQUIRED'
    })
});

module.exports = { bookValidate }