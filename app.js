const request = require('request')

const url = 'https://strawpoll.me/api/v2/polls/19458584'

request({url:url,json:true},(err,res)=>{
    const data = res.body
    console.log(data.title)
    for(var i = 0; i < data.options.length; i++) {
        console.log('Votes for ' + data.options[i] + ': ' + data.votes[i])
    }
})