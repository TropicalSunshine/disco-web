const path = require("path");

module.exports = function override(config, env){

    var { alias } = config.resolve;

    config.resolve.alias = {
        ...alias,
        shared : path.resolve(__dirname, "src/shared"),
        assets : path.resolve(__dirname, "src/assets"),
        css : path.resolve(__dirname, "src/css"),
        pages : path.resolve(__dirname, "src/pages")
    }

    return config;
}