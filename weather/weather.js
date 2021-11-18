const https = require('https');
const api = require('./api.json');

function getLocation(city, country_code){
    return `${city}, ${country_code}`
}

function printError(error){
    console.error(error.message)
}

function printMessage(location, temperature){
    const message = `In ${location}, there is a temperature of ${temperature} K`;
    console.log(message);
}

function get(query){
    const readableQuery = query.replace('_',' ');
    try{
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`, 
        response => {
            let body = ""
            response.on('data', data => {
                body += data.toString()
            });
            response.on('end', ()=>{
                try{
                    const weather = JSON.parse(body)
                    if (weather.cod === 200) {
                        printMessage(getLocation(weather.name, weather.sys.country), weather.main.temp)
                    }else{
                        const queryError = new Error(`The location "${readableQuery}" was not found`)
                        printError(queryError)
                    }
                } catch (error){
                    printError(error)
                }
            }) 
        })
    } catch (error){
        printError(error);
    }
}

module.exports.get = get;