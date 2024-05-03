const config = {
    production: {
        port: (process.env.PORT || 4000),
        database: "mongodb://localhost:27017/introspects"
    },
    default: {
        port: (process.env.PORT || 3000),
        database: "mongodb://localhost:27017/introspects"
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}