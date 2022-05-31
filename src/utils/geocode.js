const request = require('request')
    // const url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=3025d23b9e703b8fa998f6c6373ebbe2'
    // request({ url: url, json: true }, (error, response) => {
    //         console.log(response.body.list[1].main.temp);
    //     })
    // const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFyY29waG9lbml4IiwiYSI6ImNsMHR6YWM5djBidWgzb2tiNW54cGRkaGUifQ.AMoNafamqawvwjK508WgtA'
    // request({ url: geocodeurl, json: true }, (error, response) => {
    //    const latitude = response.body.features[0].center[1]
    //     const longitude = response.body.features[0].center[0]
    //     console.log(latitude, longitude)
    // })
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFyY29waG9lbml4IiwiYSI6ImNsMHR6YWM5djBidWgzb2tiNW54cGRkaGUifQ.AMoNafamqawvwjK508WgtA'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log("unable to")
            callback("unable to connect", undefined)

        } else if (body.features.lenght === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {

                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode