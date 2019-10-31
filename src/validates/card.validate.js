const Joi = require('@hapi/joi');
const todate = new Date().toISOString().slice(0, 10);
const cardValidate = Joi.object({
    seriesNumber: Joi.string().length(10).empty().alphanum().required().messages({
        'string.length': 'SERIESNUMBER_LENGTH_10',
        'any.required': 'SERIESNUMBER_IS_REQUIRED',
        'string.empty': 'SERIESNUMBER_CAN_NOT_EMPTY',
        'string.alphanum': 'SERIESNUMER_CAN_NOT_SPECIAL_CHARACTER'
    }),
    startDate: Joi.date().iso().required().min(todate).messages({
        'data.base': 'INVALID_STARTDATE',
        'any.required': 'STARTDATE_IS_REQUIRED',
        'date.format': 'STARTDATE_FORMAT_YYYY_MM_DD',
        'date.min': 'STARTDAT_BIGGER_TO_DAY'
    }),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
        'date.base': 'INVALID_ENDDATE',
        'any.required': 'ENDDATE_IS_REQUIRED',
        'date.format': 'ENDDATE_FORMAT_YYYY_MM_DD',
        'date.greater': 'ENDDAY_GREATER_THAN_STARTDAY'
    }),
    note: Joi.string(),
    reader: Joi.string()
});

module.exports = { cardValidate };