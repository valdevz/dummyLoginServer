const express        = require( 'express' ),
      app            = express(),
      LoginRoutes    = require( './login' ),
      RegisterRoutes = require( './register' ),
      Users          = require( './users' );

app.use( '/register', RegisterRoutes )

app.use( '/login', LoginRoutes )

app.use( '/users', Users )

module.exports = app;