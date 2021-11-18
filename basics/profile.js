const https = require('https');
const http = require('http');
const username = "chalkers"

function printMessage(username, badgeCount, points){
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JS`;
    console.log(message);
}

function printError(error){
    console.error(error.message)
}

printMessage(username, 100, 200000)

function get(username){
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if (response.statusCode === 200){
            let body = ""
            response.on('data', data => {
                body += data.toString()
            });
            response.on('end', () => {
                try{
                    const profile = JSON.parse(body)
                printMessage(username,profile.badges.length, profile.points.JavaScript)
                }catch (error){
                    printError(error)
                }
            });
        }else{
            const message = `there was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
            const statusCodeError = new Error(message);
            printError(statusCodeError)
        }
        }).on('error', error => console.error(`Problem with request: ${error.message}`))
    }catch (error){
        printError(error)
    }
}

module.exports.get = get;
