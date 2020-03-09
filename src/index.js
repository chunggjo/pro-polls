const path = require('path')
const request = require('request')
const express = require('express')
require('./db/mongoose')
const Poll = require('./models/poll')
const hbs = require('hbs')
const getPoll = require('./utils/getPoll')

const app = express()
const port = process.env.PORT || 3000

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
app.use(express.json())

app.get('',(req,res)=>{
    res.render('index',{
        title:'Welcome to AnonVote!'
    })
})

app.post('/polls',(req,res)=>{
    const poll = new Poll(req.body)

    poll.save().then(()=>{
        res.send(poll)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/vote',(req,res)=>{

    if(!req.query.id){
        return res.send({error:'Must provide a poll ID.'})
    }
    getPoll(req.query.id,(error,{title,options,votes,multi}={})=>{
        if(error){
            return res.send({error})
        }
        return res.send({
            pollTitle:title,
            options,
            votes,
            multi
        })
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

