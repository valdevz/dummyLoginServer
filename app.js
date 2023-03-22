const express = require('express'),
      app  = express(),
      router = express.Router(),
      Routes = require('./Routes/index'),
      bodyParser = require('body-parser'),
      cors = require( 'cors' ),
      PORT = process.env.PORT || 4100;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen(PORT, () => {
  console.log(`API is running on port : ${PORT}`)
})

app.use('/v1/api/', Routes)

app.use('/',(req, res, next) => {
  res.status(200).send('Bienvenido a la API con datos Dummy')
})

app.use((req, res, next) => {
  res.status(404).send('Error: Not found.')
})

app.get('*',(req, res) => {
  res.status(404).send('Error: Not found.')
});