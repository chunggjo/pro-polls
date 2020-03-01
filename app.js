const request = require('request')
const getPoll = require('./utils/getPoll')

getPoll('19458348',(err,data)=>{
    console.log('Error',err)
    console.log('Data',data)
    // console.log(data.title)
    // for(var i = 0; i < data.options.length; i++) {
    //     console.log('Votes for ' + data.options[i] + ': ' + data.votes[i])
    // }
})