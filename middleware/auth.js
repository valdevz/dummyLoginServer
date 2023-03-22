const jwt            = require( 'jsonwebtoken' ),
rateLimit = require( 'express-rate-limit' ),
APP_CONSTANTS  = require( '../Utils/appConstants' );


const loginlimiter = rateLimit( { 
  windowMs: 10 * 60 * 1000, max: 5, 
  standardHeaders: true, 
  legacyHeaders: false, 
  message: APP_CONSTANTS.ERRORS.BRUTE_FORCE_ATTACK } );

  const createToken = ( payload, userId = payload.userId ) => {
  return jwt.sign(
    { userId: userId, emailId: payload.emailId, rol: payload.rol },
    APP_CONSTANTS.TOKEN_KEY,
    {
      expiresIn: "6h",
    }
  );
}

const verifyToken = (req, res, next) => {
  try {
    let valid = tokenValidation( req )
    if( !valid.status ) return res.status( valid.code ).send( valid.message );
    else bearerToken = valid.bearerToken

    const decode = jwt.verify(bearerToken, APP_CONSTANTS.TOKEN_KEY, ( err, code ) => {
      return {...code,...err}
    } );
    if ( decode.expiredAt ) return res.status( 401 ).send( APP_CONSTANTS.ERRORS.UNAUTHORIZED.EXPIRED );
    return next(); 
  } catch ( err ) {
    console.log( err )
    res.status( 403 ).send( APP_CONSTANTS.ERRORS.UNKNOWN.UNKNOWN_ERROR );
  }
};

 const tokenValidation = ( req ) => {
  try {
    let headers = req.headers['authorization'];
    let bearerToken;
    if( !headers ) return { status: false, code: 403, message: APP_CONSTANTS.ERRORS.UNAUTHORIZED.PERMISSIONS }
    
    let token = req.headers['authorization'].split(' ')
    
    if ( token.length != 2 ) return { status: false, code: 403, message: APP_CONSTANTS.ERRORS.UNAUTHORIZED.UNAUTHORIZED_TOKEN }
    else bearerToken = token[1];

    if (!token) return { status: false, code: 403, message: APP_CONSTANTS.ERRORS.UNAUTHORIZED.UNAUTHORIZED_TOKEN } 

    return { status: true, bearerToken };
  } catch (error) {
    return { status: false, code: 403, message: APP_CONSTANTS.ERRORS.UNKNOWN.UNKNOWN_ERROR } 
  }
}


module.exports = {
  createToken,
  verifyToken,
  loginlimiter
}