const path = require('path')
const express = require('express')
const expbs = require('express-handlebars')
const app = express()
require('./db/mongoose')
const Poll = require('./models/poll')

const port = process.env.PORT || 8080

const publicDirectoryPath = path.join(__dirname,'../public')

const hbs = expbs.create({
    defaultLayout:'main',
    helpers:{
        radioButtons: function(value){
            var out = ''
            for(var i = 0; i < value.length; i++){
                var option = value[i].option
                var votes = value[i].votes
                out+='<div>'
                out+='<input type="radio" name="option" value="'+option+'">'
                out+='<label for="'+option+'">'+option+' - '+votes+' votes</label>'
                out+='</div>'
            }
            return out
        }
    }

})
app.engine('handlebars',hbs.engine)
app.set('view engine','handlebars')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('/',(req,res)=>{
    myFunction(req)
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

app.post('/create',async(req,res)=>{
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
            // return res.status(404).send()
            return res.render('404',{
                pageTitle:'AnonVote - Poll not found',
                headerText:'404 - Poll not found'
            })
        }

        res.render('poll',{
            pageTitle:'AnonVote - Vote',
            headerText:'Vote!',
            pollTitle:poll.title,
            options:poll.options
        })
    }catch(e){
        res.status(500).send()
    }
})

app.patch('/polls/:id',async(req,res)=>{
    try {
        var poll = await Poll.findOne({id: req.params.id})
        var option = poll.options.find(o => o.option === req.body.option)
        option.votes+=1
        
        await poll.save()

        // var poll = await Poll.findOne({id: req.params.id}).updateOne({'options.option': req.body.option}, {$inc: {
        //     'options.$.votes': 1
        // }})

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

const bcrypt = require('bcryptjs')
const requestIp = require('request-ip')

const myFunction = async(req)=>{
    const clientIp = requestIp.getClientIp(req)
    const hashedIp = await bcrypt.hash(clientIp, 8)

    console.log(clientIp)
    console.log(hashedIp)

    const isMatch = await bcrypt.compare("::1", hashedIp)
    console.log(isMatch)
}
