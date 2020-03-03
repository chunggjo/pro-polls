const path = require('path')
const request = require('request')
const getPoll = require('./utils/getPoll')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Welcome to AnonVote!'
    })
})
app.get('/vote',(req,res)=>{

    if(!req.query.id){
        return res.send({
            error:'Must provide a poll ID.'
        })
    }
    getPoll(req.query.id,(error,{title,options,votes})=>{
        if(error){
            return res.send({
                error
            })
        }
        return res.send({
            title,
            options,
            votes
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found'
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
