const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Config = require('../config').get(process.env.NODE_ENV);
let promise = mongoose.connect(Config.database)

promise.then(() => {
    console.log("I can remember everything")
})

mongoose.connection.once('open', err => {
    console.log('MongoDB event open');
    console.log('MongoDB connected [%s]', Config.database);

    mongoose.connection.on('connected', () => {
        console.log('MongoDB event connected');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB event disconnected');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('MongoDB event reconnected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB event error: ' + err);
    });

});
promise.catch((err) => {
    console.log('Err', err)
})