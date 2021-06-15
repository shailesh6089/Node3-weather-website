const request = require('request')
function forecast (lat, long , callback) {

    const url ='http://api.weatherstack.com/current?access_key=36ecaafe6882872231e09c562e1b8564&query='+ lat +','+ long +'&units=f'
    request({ url, json: true}, (error,{body}) =>{
        if(error){
            callback('Unable to connect to location services!', undefined)

        }else if(body.error){
            callback('Unable to find location! Try another search.', undefined)
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]} . it is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out` )
        }

    })
}

module.exports = forecast