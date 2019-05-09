/**
 * @file fetch2 middle - error handler for fetch2
 * Created by Xinyi on 2019-05-07.
 */

/**
 * convert the error message to target content & report error message
 * @param {Object} params - configuration
 * @param {string} params.errorPath - check error
 * @param {object} params.map - mapping data
 * @param {string} params.errorField - error filed for response
 * @param {boolean} params.report - whether report
 * @param {object} params.defaultParams - default params for report
 */
export default function (params) {
    const {
        errorPath,
        map,
        errorField = null,
        report = false,
        reportTarget = '',
        defaultReport = null
    } = params

    return async function (ctx, next) {
        await next()
        const error = response => errorPath.split('.').reduce((result, current) => result[current], response)
        const errorMsg = map.status[ctx._response.status] || map.body[error(ctx.response)] || ctx.response
        if (errorField) {
            ctx.response[errorField] = errorMsg
        }
        else {
            ctx.response = errorMsg
        }
        // Todo: whether throw error
        // Todo: error report
    }
}
