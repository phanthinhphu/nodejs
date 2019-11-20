const Joi = require('@hapi/joi');
const todate = new Date().toISOString().slice(0, 10);

const borrowValidate = Joi.object({
    startDate: Joi.date().iso().min(todate).required().empty().messages({
        'date.format': 'FORMAT_DATE_YYYY_MM_DD',
        'any.required': 'REQUIRED_STARTDATE',
        'date.empty': 'EMPTY_STARTDATE',
        'date.min': 'STASTDATE_MUST_BE_GREATER_THAN_OR_EQUAL_CURRENT_TO_DAY'
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().empty().messages({
        'date.format': 'FORMAT_DATE_YYYY_MM_DD',
        'any.required': 'REQUIRED_ENDDATE',
        'date.empty': 'EMPTY_ENDDATE',
        'date.greater': 'END_MUST_BE_GREATER_THAN_OR_EQUAL_CURRENT_STARTDATE'
    }),
    user: Joi.string(),
    card: Joi.string(),
    books: Joi.array(),
    note: Joi.string().empty(''),
    status: Joi.boolean()
});

const updateBorrowValidate = Joi.object({
    startDate: Joi.date().iso().required().empty().messages({
        'date.format': 'FORMAT_DATE_YYYY_MM_DD',
        'any.required': 'REQUIRED_STARTDATE',
        'date.empty': 'EMPTY_STARTDATE'
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().empty().messages({
        'date.format': 'FORMAT_DATE_YYYY_MM_DD',
        'any.required': 'REQUIRED_ENDDATE',
        'date.empty': 'EMPTY_ENDDATE',
        'date.greater': 'END_MUST_BE_GREATER_THAN_OR_EQUAL_CURRENT_STARTDATE'
    }),
    user: Joi.string(),
    card: Joi.string(),
    books: Joi.array(),
    note: Joi.string().empty(''),
    status: Joi.boolean()
});

module.exports = { borrowValidate,updateBorrowValidate };