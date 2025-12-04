const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Fire Dept API',
        description: 'API for managing Fire Department data'
    },
    host: 'cse341-final-project-zhdg.onrender.com',
    schemes: ['https']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
