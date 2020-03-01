const request = require('request')
const getPoll = require('./utils/getPoll')

const id = process.argv[2]
if(!id){
    return console.log('Please provide a poll ID')
}
// 19458348
getPoll(id,(err,data)=>{
    if(err){
        return console.log(err)
    }
    console.log(data.title)
    for(var i = 0; i < data.options.length; i++) {
        console.log('Votes for ' + data.options[i] + ': ' + data.votes[i])
    }
})
