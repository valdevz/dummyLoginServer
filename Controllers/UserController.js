const bcrypt         = require( 'bcryptjs' ),
      APP_CONSTANTS  = require( '../Utils/appConstants' ),
      auth           = require( '../middleware/auth' ),
      universalFuncts = require('../Utils/universalFunctions');

class UsersController {

  static searchByFilter ( filter ) {
    return new Promise( async (resolve, reject ) => {
      try {
        let name = filter.name;
        if ( typeof name != 'string' || (name.length == 0) ) return reject( { code: 400, message: APP_CONSTANTS.ERRORS.BAD_REQUEST.VALUE_TYPE } )
        let skip = filter.skip != undefined ? filter.skip : 0;
        if ( Number( skip ) < 0 ) return reject( { code: 400, message: APP_CONSTANTS.ERRORS.BAD_REQUEST.VALUE_TYPE } )
        let limit = filter.limit != undefined ? filter.limit : 5;
        if ( Number( limit ) < 0 ) return reject( { code: 400, message: APP_CONSTANTS.ERRORS.BAD_REQUEST.VALUE_TYPE } )
        //here should be the query to DB
        let users = universalFuncts.getUsersByFilter( name );

        return resolve({ code: 201, message: { results: users } } );
          
        } catch ( error ) {
          reject( { code: 400, message: { results: error } } );
        }
    } )
  }
  
  static validRegFields(payload) {
    let regex = new RegExp( '[a-z0-9]+@[a-z]+\.[a-z]{2,3}' );
    if( payload.userName === undefined || payload.userName === '' ) return { status: true, code: 400, message: APP_CONSTANTS.ERRORS.REGISTER.INVALID_NAME };
    if( payload.phoneNo === undefined || payload.phoneNo === '' ) return { status: true, code: 400, message: APP_CONSTANTS.ERRORS.REGISTER.INVALID_PHONE };
    if( payload.lastname === undefined || payload.lastname === '' ) return { status: true, code: 400, message: APP_CONSTANTS.ERRORS.REGISTER.INVALID_LASTNAME };
    if( payload.dateOfBirth === undefined || payload.dateOfBirth ===  '' ) return { status: true, code: 400, message: APP_CONSTANTS.ERRORS.REGISTER.INVALID_BIRTH };
    if( payload.address === undefined || typeof payload.address != 'object' && payload.address.length != 2 ) return { status: true, code: 400, message: APP_CONSTANTS.ERRORS.REGISTER.INVALID_ADDRESS };
    if( payload.password ===  undefined ) return { status: true, code: 400, message: APP_CONSTANTS.ERRORS.REGISTER.INVALID_PASSWORD };
    if ( payload.emailId != undefined  && (!regex.test( payload.emailId )) ) return { status: true, code: 400, message: APP_CONSTANTS.ERRORS.REGISTER.INVALID_MAIL };

    return { status: false }
  }

  static async userExist( payload ) {
    let mailExist = universalFuncts.findByMail( payload.emailId )
    if( mailExist != undefined ) return { status: true, code: 409, message: APP_CONSTANTS.ERRORS.REGISTER.USER_EXIST };
    let phonexist = universalFuncts.findByphone( payload.phoneNo )
    if( phonexist != undefined ) return { status: true, code: 409, message: APP_CONSTANTS.ERRORS.REGISTER.USER_EXIST };
    return { status: false }
  }

  static createUserId( payload ) {
    let lastname ;
    /*Part1: first 2 letters of the name*/
    let part1 = payload.userName.trim().split( ' ' )[0].substring(0,2);

    if( payload.lastname == ( undefined || '' ) ) lastname = payload.secondLastname;
    else lastname = payload.lastname;

    /*Part2: first 2 letters of the first lastname*/
    let part2 = lastname.trim().split( ' ' )[0].substring( 0, 2 );
    /*Part3: random number from 0 to 100*/
    let part3 = Math.floor( Math.random() * 101 );
    
    return part1 + part2 + part3;
  }

  static trimPayload( payload ) {
    Object.keys( payload ).map( k => {
      payload[k] = typeof payload[k] == 'string' ? payload[k].trim() : payload[k]
    } );
    return payload;
  }

  static formatBirthDate( date ) {
    let day = date.split( '/' )[0];
    let month = date.split( '/' )[1];
    let year = date.split( '/' )[2];
    return Date.parse(`${year}-${month}-${day}`);
  }

  static async Register( payload ) {
    return new Promise( async ( resolve, reject ) => {
      if(!payload)return resolve( { status: true, code: 400, message: APP_CONSTANTS.ERRORS.BAD_REQUEST.VALUE_TYPE } )
      let areFieldsValid = this.validRegFields( payload );
      if ( areFieldsValid.status ) return reject( areFieldsValid );
      
      let userExist = await this.userExist( payload );
      if ( userExist.status ) return reject( userExist );

      payload = this.trimPayload( payload )

      let userId = this.createUserId( payload );

      let encryptedPassword = await bcrypt.hash( payload.password, 12 );

      let epoxDate = this.formatBirthDate( payload.dateOfBirth );

      const token = auth.createToken( payload, userId );
      let user = payload;
      user.epoxBirthDate = epoxDate;
      user.token = token;
      user.createdDate = Date.parse( new Date());
      return resolve( { status: true, code: 201, message: user } );

    } )
  }
  
  static async getAllUsers( skip, limit ) {
    if ( skip == undefined ) skip = 0;
    if ( limit == undefined ) limit = 10;
    let allUsers = universalFuncts.getAllUsers();

    let count = allUsers.length;
    allUsers.push({'counter': count})
    return allUsers;
  }

  static async getUserById( id ) {
    let user = universalFuncts.getUsersById( id );

    if( user ) return { code: 201, message: { user } }
    return { code: 404, message: APP_CONSTANTS.ERRORS.NOT_FOUND }
  }
}

module.exports = UsersController;