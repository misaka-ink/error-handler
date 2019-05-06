/**
 * @file fetch2 middle - error handler for fetch2
 * Created by Xinyi on 2019-05-07.
 */

/**
 * convert the error message to target content & report error message
 * @param {Object} params - configuration
 * @param {string} params.errorPath - check error
 * @param {object} params.map - Mapping data
 * @param {boolean} params.report - whether report
 * @param {object} params.defaultParams - default params for report
 */
export default function (params) {
    const {errorPath, map, report = false, reportTarget = '', defaultParams} = params
    return async function (ctx, next) {
        await (next)
        console.log(ctx.response)
        try {
            const error = response => errorPath.split('.').reduce((result, current) => result[current], response)
            ctx.response = map[error(ctx.response)]
        }
        catch (e) {
            throw e
        }
    }
}
