const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
//const { url } = require('inspector');
const app = express();
const swaggerDocument = require('./public/swagger.json');

const users = {
    "user1": "otp1",
    "user2": "otp2",
};



// Swagger setup
const swaggerDefinition = {
    openapi : '3.0.0',
    info: {
        title: 'Login API',
        version: '1.0.0',
        description: 'API documentation for user login',
    },
    servers:[{
        url: 'http://localhost:3000',
        description: 'login api'
    }],
};
 
/*const swaggerDefinition2 = {
    openapi: '3.0.0',
    info: {
        title: 'Signup API',
        version: '1.0.0',
        description: 'API documentation for user signup',
    },
    servers:[{
        url: 'http://localhost:3000',
        description: 'signup api'
    }],
};

const swaggerDefinition3 = {
    openapi: '3.0.0',
    info: {
        title: 'Labels api',
        version: '1.0.0',
        description: 'API documentation for user signup',
    },
    servers:[{
        url: 'http://localhost:3000',
        description: 'signup api'
    }],
};
*/

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));
app.get('/labels', (req, res) => {
    res.json({ labels: predefinedLabels });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

