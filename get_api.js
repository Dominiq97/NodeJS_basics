const https = require('https');
const username = "chalkers"

function printMessage(username, badgeCount, points){
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JS`;
    console.log(message);
}

printMessage(username, 100, 200000)

function getProfile(username){
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            console.dir(response.statusCode);
            let body = ""
            response.on('data', data => {
                body += data.toString()
            });
            response.on('end', () => {
                const profile = JSON.parse(body)
                printMessage(username,profile.badges.length, profile.points.JavaScript)
            });
        }).on('error', error => console.error(`Problem with request: ${error.message}`))
    }catch (error){
        console.error(error.message)
    }
}

const users = process.argv.slice(2);
users.forEach(getProfile);
// const users = ["chalkers","alenaholligan"]

// users.forEach(username => {
//     getProfile(username);
// })