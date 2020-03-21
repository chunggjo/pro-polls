const path = require('path'),
http = require('http')
const express = require('express'),
expbs = require('express-handlebars')
require('./db/mongoose')
const Poll = require('./models/poll')
const socketio = require('socket.io'),
{addUser,removeUser,getUser} = require('./utils/users')
const requestIp = require('request-ip'),
    ip = require('ip')

const app = express()
const server = http.createServer(app),
io = socketio(server)

const port = process.env.PORT,
publicDirectoryPath = path.join(__dirname,'../public')

const hbs = expbs.create({
    defaultLayout:'main',
    helpers:{
        json:function(value){
            return JSON.stringify(value)
        }
    }
})

app.engine('handlebars',hbs.engine)
app.set('view engine','handlebars')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.use(requestIp.mw())

app.get('/',(req,res)=>{
    res.render('index',{
        pageTitle:'Pro Polls - Home',
        headerText:'Welcome to Pro Polls!'
    })
})

app.get('/create',(req,res)=>{
    res.render('create',{
        pageTitle:'Pro Polls - Create',
        headerText:'Create a Poll'
    })
})

app.post('/create',async(req,res)=>{
    const poll = new Poll(req.body)

    poll.save().then(()=>{
        res.status(201).send(poll)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/polls/:id',async(req,res)=>{
    try {
        const poll = await Poll.findOne({id:req.params.id})

        if(!poll){
            return res.status(404).render('404',{
                pageTitle:'Pro Polls - Poll not found',
                headerText:'404 - Poll not found'
            })
        }

        res.render('poll',{
            pageTitle:'Pro Polls - Vote',
            headerText:'Vote!',
            poll
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

        res.status(200).send(poll)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.get('*',(req,res)=>{
    res.render('404',{
        pageTitle:'Pro Polls - Page not found',
        headerText:'404 - Page not found',
        errorMessage:''
    })
})

io.on('connection', (socket)=>{
    socket.on('join',(pollId)=>{
        const user = addUser(socket.id,pollId)

        socket.join(user.pollId)
    })

    socket.on('vote',(data)=>{
        const user = getUser(socket.id)

        // Show updated options to users
        io.to(user.pollId).emit('vote', data)
    })

    socket.on('disconnect',()=>{
        removeUser(socket.id)
    })
})

server.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

