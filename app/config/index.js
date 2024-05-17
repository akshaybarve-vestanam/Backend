/*const config = {
    production: {
        port: (process.env.PORT || 4000),
        database: "mongodb+srv://akshaybarve:1d439oefigx5s9Ku@cluster0.2rzee0e.mongodb.net/introspects"
    },
    default: {
        port: (process.env.PORT || 3000),
        database: "mongodb+srv://akshaybarve:1d439oefigx5s9Ku@cluster0.2rzee0e.mongodb.net/introspects"
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}*/


const config = {
    production: {
        port: process.env.PORT || 4000,
        database: "mongodb+srv://akshaybarve:1d439oefigx5s9Ku@cluster0.2rzee0e.mongodb.net/introspects"
    },
    default: {
        port: process.env.PORT || 3000,
        database: "mongodb+srv://akshaybarve:1d439oefigx5s9Ku@cluster0.2rzee0e.mongodb.net/introspects"
    }
};

exports.get = function get(env) {
    return config[env] || config.default;
};
