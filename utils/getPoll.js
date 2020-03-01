const request = require('request')

const getPoll = (id,callback)=>{
    const url = 'https://www.strawpoll.me/api/v2/polls/'+encodeURIComponent(id)
    
    request({url:url,json:true},(err,res)=>{
        if(err) {
            callback('Unable to connect to service')
        } else if(!res.body) {
            callback('Could not find poll ID')
        } else {
            callback(undefined,{
                title:res.body.title,
                options:res.body.options,
                votes:res.body.votes
            })
        }
    })    
}

module.exports = getPoll