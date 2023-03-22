let ERRORS = {
  BRUTE_FORCE_ATTACK: 'You reached the max request number, please try again in 20 min',
  BAD_REQUEST : {
    VALUE_TYPE: 'Bad request'
  },
  LOGIN: {
    INVALID_CREDENTIALS : 'Login Failed: Your user ID/email or password is incorrect.',
    FIELDS_REQUIRED     : 'Email/user ID and password are required.'
  },
  REGISTER : {
    USER_EXIST             : 'User already exist.',
    INVALID_MAIL           : 'Invalid value for emailId input.',
    INVALID_ROL            : 'Invalid value for rol input.',
    INVALID_NAME           : 'Invalid value for name input.',
    INVALID_PHONE          : 'Invalid value for phone input.',
    INVALID_LASTNAME       : 'Invalid value for lastname input.',
    INVALID_SECONDLASTNAME : 'Invalid value for seconLastname input.',
    INVALID_BIRTH          : 'Invalid value for dateOfBirth input.',
    INVALID_ADDRESS        : 'Invalid value for address input.',
    INVALID_PASSWORD       : 'Invalid value for password input.',
    INVALID_ARRAY          : 'Invalid value for inCharge input.',
    INVALID_USERID         : 'Invalid value for userId input.',
  },
  NOT_FOUND : '404 error: Not found.',
  UNAUTHORIZED : {
    UNAUTHORIZED_TOKEN : 'Unauthorized token.',
    BAD_TOKEN : 'Bad token format.',
    EXPIRED   : 'Token expired.',
    PERMISSIONS : 'You do not have the permisions to do this operation.',
  },
  UNKNOWN : {
    UNKNOWN_ERROR : 'Unknown error.'
  },
}
let TOKEN_KEY = 'Valdevz'

module.exports = {
  ERRORS,
  TOKEN_KEY,
}