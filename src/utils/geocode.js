const request = require('request')
function geocode (address, callback) {

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hhaWxlc2g2MDg5IiwiYSI6ImNrcHFsbnc4aDA4a3kybm1tdzZwb2VsZGwifQ.fTKASMZxG7iE8a1Z1DZCpQ&limit=1'
    request({ url, json: true}, (error,{body}) =>{
        if(error){
            callback('Unable to connect to location services!', undefined)

        }else if(body.length === 0){
            callback('Unable to find location! Try another search.', undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                laongitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode