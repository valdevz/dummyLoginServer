const bcrypt         = require( 'bcryptjs' ),
      APP_CONSTANTS  = require( '../Utils/appConstants' ),
      jwt            = require( 'jsonwebtoken' ),
      auth           = require( '../middleware/auth' ),
      UniversalFuncs = require('../Utils/universalFunctions');;

class AuthController {
  static login( payload ) {
    return new Promise( async( resolve, reject ) => {
      try {
        if(payload == undefined || payload.user == undefined || payload.pass == undefined) return resolve( { status: true, code: 400, message: APP_CONSTANTS.ERRORS.LOGIN.FIELDS_REQUIRED } )
        let user = payload.user.trim().toString();
        let pass = payload.pass;
        if( !user ) return resolve( { status: true, code: 400, message: APP_CONSTANTS.ERRORS.LOGIN.FIELDS_REQUIRED } )
        if( !pass ) return resolve( { status: true, code: 400, message: APP_CONSTANTS.ERRORS.LOGIN.FIELDS_REQUIRED } )

        let userData  = Object.assign({},UniversalFuncs.findByUnameOrMail( user ));
        if ( userData == undefined || userData.password == undefined ) return resolve( { status: true, code: 400, message: APP_CONSTANTS.ERRORS.LOGIN.INVALID_CREDENTIALS } )
        const comparePass = await bcrypt.compare( pass, userData.password );

        if ( !comparePass ) return resolve( { status: true, code: 400, message: APP_CONSTANTS.ERRORS.LOGIN.INVALID_CREDENTIALS } )
        userData.password = undefined;
        userData.updatedDate = undefined;
        
        userData.token = auth.createToken( userData );

      return resolve( { status: true, code: 200, message: userData} );
      } catch (error) {
        reject(error)
      }

    } )
  }
}

module.exports = AuthController;