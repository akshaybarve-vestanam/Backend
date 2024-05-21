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
        secret:"eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTc2NjExNCwiaWF0IjoxNzE1NzY2MTE0fQ.x_4EmzrgS8xjoWQYGK9l5EXP0FM5zwEZZHlmedW4itA",
        database: "mongodb+srv://akshaybarve:1d439oefigx5s9Ku@cluster0.2rzee0e.mongodb.net/introspects"
    },
    default: {
        port: process.env.PORT || 3000,
        secret:"eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTc2NjExNCwiaWF0IjoxNzE1NzY2MTE0fQ.x_4EmzrgS8xjoWQYGK9l5EXP0FM5zwEZZHlmedW4itA",
        database: "mongodb+srv://akshaybarve:1d439oefigx5s9Ku@cluster0.2rzee0e.mongodb.net/introspects"
    }
};

exports.get = function get(env) {
    return config[env] || config.default;
};
