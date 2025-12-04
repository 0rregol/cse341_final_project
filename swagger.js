const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Fire Dept API',
        description: 'API for managing Fire Department data'
    },
    host: 'cse341-final-project-58w8.onrender.com',
    schemes: ['https', 'http']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
