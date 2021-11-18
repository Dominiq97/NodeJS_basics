const profile = require('./profile')

const users = process.argv.slice(2);
users.forEach(profile.get);
// const users = ["chalkers","alenaholligan"]

// users.forEach(username => {
//     getProfile(username);
// })