const express = require('express'),
      router = express.Router(),
      Controllers = require( '../Controllers/index' ),
      loginlimiter = require( '../middleware/auth' ).loginlimiter;

router.post('/', loginlimiter, (req, res) => {
  try {
    Controllers.AuthController.login( req.body )
    .then( result => {
      return res.status( result.code ).type( 'json' ).send( result.message );
    })
    .catch( err => {
      console.log( err )
      return res.status( err.code ).type( 'json' ).send( err.message );
    })
  } catch (err) {
    console.log( err );
    res.status( 400 ).send( 'Unexpected error.' )
  }
})

module.exports = router;