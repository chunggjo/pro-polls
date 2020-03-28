// const request = require('request')

// const getIP = (ip) => {
//     url = 'https://json.geoiplookup.io/8.8.8.8'

//     request({ url: url, json: true }, (error, { ip }) => {
//         if(error) {
//             callback('Unable to connect to ip lookup service')
//         } else if (ip.error) {
//             callback('Unable to find ip address', undefined)
//         }else {
//             callback(undefined, ip)
//         }
//     })
// }

// module.exports = getIP