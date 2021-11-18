const weather = require('./weather')

const users = process.argv.slice(2);
users.forEach(weather.get);