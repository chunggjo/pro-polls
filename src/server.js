const path = require('path')
const http = require('http')
const express = require('express')
const expbs = require('express-handlebars')
require('./db/mongoose')
const Poll = require('./models/poll')
const socketio = require('socket.io')
const requestIp = require('request-ip')
const ip = require('ip')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

const hbs = expbs.create({
    defaultLayout:'main',
    helpers:{
        // createPollForm: function(value){
        //     var out = ''
        //     for(var i = 0; i < value.length; i++){
        //         var option = value[i].option
        //         var votes = value[i].votes
        //         out+='\n<div>'
        //         out+='\n<input id="'+option+'" type="radio" name="option" value="'+option+'">'
        //         out+='\n<label for="'+option+'">'+option+' - <span id="'+option+'-votes">'+votes+'</span> votes</label>'
        //         out+='\n</div>'
        //     }
        //     return out+'\n'
        // },
        json:function(value){
            return JSON.stringify(value)
        }
    }
})

// app.engine('handlebars',expbs({
//     defaultLayout:'main'
// }))

app.engine('handlebars',hbs.engine)
app.set('view engine','handlebars')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.use(requestIp.mw())

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

app.post('/create',async(req,res)=>{
    const poll = new Poll(req.body)

    poll.save().then(()=>{
        res.status(201).send({
            title:poll.title,
            options:poll.options,
            id:poll.id
        })
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/polls/:id',async(req,res)=>{
    try {
        const poll = await Poll.findOne({id:req.params.id})

        if(!poll){
            return res.status(404).render('404',{
                pageTitle:'AnonVote - Poll not found',
                headerText:'404 - Poll not found'
            })
        }

        res.render('poll',{
            pageTitle:'AnonVote - Vote',
            headerText:'Vote!',
            pollTitle:poll.title,
            options:poll.options,
            pollId:poll.id
        })
    }catch(e){
        res.status(500).send()
    }
})

app.patch('/polls/:id',async(req,res)=>{
    try {
        const poll = await Poll.findOne({id: req.params.id})
        
        if(!poll){
            return res.status(404).send()
        }
    
        // Check ip for possible duplicate vote
        const clientIp = ip.toBuffer(req.clientIp)
        const existingIpIndex = poll.voters.map(x=>ip.toString(x.ip_buffer)).indexOf(ip.toString(clientIp))
        if(existingIpIndex !== -1) {
            return res.status(400).send()
        }

        poll.voters.push({'ip_buffer':clientIp})
        
        const option = poll.options.find(o => o.option === req.body.option)
        option.votes+=1

        await poll.save()

        res.status(200).send({
            title:poll.title,
            options:poll.options,
            pollId:poll.id
        })
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

const users = []

io.on('connection', (socket)=>{
    console.log('New WebSocket Connection')

    socket.on('join',(pollId)=>{
        const user = {
            id: socket.id,
            pollId
        }
        users.push(user)

        socket.join(user.pollId,function(){
            console.log("Socket now in rooms", socket.rooms)
        })
    })

    socket.on('vote',(data)=>{
        const user = users.find((user) => user.id === socket.id)
        // socket.broadcast.to(user.pollId).emit(data)
        io.to(user.pollId).emit('vote', data)
    })

    socket.on('disconnect',()=>{
        const index = users.findIndex((user) => user.id === socket.id)

        if (index !== -1) {
            users.splice(index, 1)[0]
        }
    })
})

server.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

