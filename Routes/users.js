const express    = require( 'express' ),
      router     = express.Router(),
      Controller = require( '../Controllers' ),
      authGet    = require( '../middleware/auth' ).verifyToken,
      APP_CONSTANTS = require( '../Utils/appConstants' );

router.get( '/byFilter', authGet , ( req, res ) => {
  try {
    Controller.UserController.searchByFilter( req.query )
      .then( result => res.status( result.code ).send( result.message ) )
      .catch( err => {
        console.log( err )
        res.status( err.code ).send( err.message ) 
      } )
  } catch ( err ) {
    res.status( 500 ).send( APP_CONSTANTS.ERRORS.UNKNOWN.UNKNOWN_ERROR )
    throw err;
  }
} )


router.get( '/', authGet, ( req, res ) => {
  try {
    let skip = req.query.skip;
    let limit = req.query.limit;
    Controller.UserController.getAllUsers( skip, limit )
      .then( result => {
        res.status( 200 ).type( 'json' ).send( result )
      } )
      .catch( reason => reason )
  } catch ( e ) {
    res.status( 500 ).send( APP_CONSTANTS.ERRORS.UNKNOWN.UNKNOWN_ERROR )
    throw e;
  }
} )


router.get( '/:id', authGet, ( req, res ) => {
  try {
    let id =  req.params.id;
    Controller.UserController.getUserById( id )
      .then( result => {
        res.status( result.code ).type( 'json' ).send( result.message );
      } )
      .catch( reason => reason )
  } catch ( e ) {
    res.status( 500 ).send( APP_CONSTANTS.ERRORS.UNKNOWN.UNKNOWN_ERROR )
    throw e;
  }
} )

module.exports = router;