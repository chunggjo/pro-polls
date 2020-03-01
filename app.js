const request = require('request')

const url = 'https://www.strawpoll.me/api/v2/polls/19458348'

request({url:url,json:true},(err,res)=>{
    if(err) {
        console.log('Unable to connect to service.')
    } else if(!res.body) {
        console.log('Could not find that poll ID.')
    } else {
        const data = res.body
        console.log(data.title)
        for(var i = 0; i < data.options.length; i++) {
            console.log('Votes for ' + data.options[i] + ': ' + data.votes[i])
        }
    }
})