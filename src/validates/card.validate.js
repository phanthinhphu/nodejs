const Joi = require('@hapi/joi');
const todate = new Date().toISOString().slice(0, 10);
const cardValidate = Joi.object({
    startDate: Joi.date().iso().required().min(todate).messages({
        'data.base': 'INVALID_STARTDATE',
        'any.required': 'STARTDATE_IS_REQUIRED',
        'date.format': 'STARTDATE_FORMAT_YYYY_MM_DD',
        'date.min': 'STARTDAT_BIGGER_TO_DAY'
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
        'date.base': 'INVALID_ENDDATE',
        'any.required': 'REQUIRED_ENDDATE',
        'date.format': 'ENDDATE_FORMAT_YYYY_MM_DD',
        'date.greater': 'ENDDAY_GREATER_THAN_STARTDAY'
    }),
    note: Joi.string().empty(''),
    reader: Joi.string()
});

module.exports = { cardValidate };