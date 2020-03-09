const path = require('path')
const express = require('express')
require('./db/mongoose')
const Poll = require('./models/poll')
const hbs = require('hbs')

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

// Home page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Welcome to AnonVote!'
    })
})

// Create poll
app.post('/polls',async(req,res)=>{
    var poll = new Poll(req.body)

    poll.save().then(()=>{
        res.send(poll)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

// Get poll
app.get('/polls/:id',async(req,res)=>{

    try {
        var poll = await Poll.findOne({id:req.params.id})

        if(!poll){
            return res.status(404).send()
        }

        // res.send(poll)
        res.render('poll',{
            title:'Vote',
            pollTitle:poll.title
        })
    }catch(e){
        res.status(500).send()
    }
})

// Vote
app.patch('/polls/:id',async(req,res)=>{
    var keys = Object.keys(req.body), key = keys[0];

    if (keys.length !== 1 || key !== "votes") {
        return res.status(400).send({error:'Invalid update'})
    }

    try {
        var poll = await Poll.findOneAndUpdate(req.params.id,req.body)
        if(!poll){
            return res.status(404).send()
        }
    
        res.send(poll)
    } catch(e) {
        res.status(400).send(e)
    }

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

