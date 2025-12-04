const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const port = process.env.PORT || 3000;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors()) 
  .use(bodyParser.json())
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});