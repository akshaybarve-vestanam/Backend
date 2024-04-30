const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
//const { url } = require('inspector');
const app = express();


const users = {
    "user1": "otp1",
    "user2": "otp2",
};


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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


const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

