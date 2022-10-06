import httpStatusCodes from './httpStatusCodes.js'
import BaseError from './baseError.js'


class Api403Error extends BaseError {
 constructor (
 name,
 statusCode = httpStatusCodes.FORBIDDEN,
 description =  'Forbidden',
 isOperational = true
 ) {
 super(name, statusCode, isOperational, description)
 }
}

export default Api403Error