const path = require('path')
const request = require('request')
const getPoll = require('../utils/getPoll')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        greeting:'Welcome to AnonVote!'
    })
})

app.listen(3000, ()=>{
    console.log('Server up on port 3000')
})
// const id = process.argv[2]
// if(!id){
//     return console.log('Please provide a poll ID')
// }
// // 19458348
// getPoll(id,(err,{title,options,votes})=>{
//     if(err){
//         return console.log(err)
//     }
//     console.log(title)
//     for(var i = 0; i < options.length; i++) {
//         console.log('Votes for ' + options[i] + ': ' + votes[i])
//     }
// })
