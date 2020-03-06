const request = require('request')

const getPoll = (id,callback)=>{
    const url = 'https://www.strawpoll.me/api/v2/polls/'+encodeURIComponent(id)
    
    request({url,json:true},(err,{body})=>{
        if(err) {
            callback('Unable to connect to service')
        } else if(!body) {
            callback('Could not find poll ID')
        } else {
            callback(undefined,{
                title:body.title,
                options:body.options,
                votes:body.votes,
                multi:body.multi
            })
        }
    })    
}

module.exports = getPoll