const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors')
const config = require('./app/config/index').get(process.env.NODE_ENV)
var morgan = require('morgan')
const app = express();
const swaggerDocument = require('./public/swagger.json');
require('./app/db');
const cookieParser = require('cookie-parser')

const users = {
    "user1": "otp1",
    "user2": "otp2",
};
const allowedOrigin = 'http://localhost:5173';
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

morgan.token('reqbody', (req) => {
    return JSON.stringify(req.body) || '-'; // Return '-' if req.body is empty
});
morgan.token('query', (req) => {
    return JSON.stringify(req.query) || '-'; // Return '-' if req.query is empty
});

const devFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" body: :reqbody - params: :query';
const devOptions = {
    skip: (req, res) => {
        // Optionally skip logging for specific routes or conditions in production
        return process.env.NODE_ENV === 'production';
    },
};

if (process.env.NODE_ENV != 'production') {
    app.use(morgan(devFormat, devOptions));
}

// Swagger setup
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Login API',
        version: '1.0.0',
        description: 'API documentation for user login',
    },
    servers: [{
        url: 'http://localhost:3000',
        description: 'login api'
    }],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};




//const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
require('./routes')(app);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});



