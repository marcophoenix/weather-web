const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=3025d23b9e703b8fa998f6c6373ebbe2'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log("unable to")
            callback("unable to connect", undefined)

        } else if (body.features === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                tmp_min: body.main.temp_min,
                hmd: body.main.humidity
            })
        }
    })
}
module.exports = forecast