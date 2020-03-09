const path = require('path')
const express = require('express')
const expbs = require('express-handlebars')
const app = express()
require('./db/mongoose')
const Poll = require('./models/poll')

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')

app.engine('handlebars',expbs({
    defaultLayout:'main'
}))
app.set('view engine','handlebars')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('/',(req,res)=>{
    res.render('index',{
        pageTitle:'AnonVote - Home',
        headerText:'Welcome to AnonVote!'
    })
})

app.get('/create',(req,res)=>{
    res.render('create',{
        pageTitle:'AnonVote - Create',
        headerText:'Create a Poll'
    })
})

app.post('/polls',async(req,res)=>{
    var poll = new Poll(req.body)

    poll.save().then(()=>{
        res.send(poll)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/polls/:id',async(req,res)=>{

    try {
        var poll = await Poll.findOne({id:req.params.id})

        if(!poll){
            return res.status(404).send()
        }

        // res.send(poll)
        res.render('poll',{
            pageTitle:'AnonVote - Vote',
            headerText:'Vote!',
            pollTitle:poll.title
        })
    }catch(e){
        res.status(500).send()
    }
})

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
        pageTitle:'AnonVote - Page not found',
        headerText:'404 - Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

