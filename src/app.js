const path = require('path'),
http = require('http')
const express = require('express'),
expbs = require('express-handlebars')
const session = require('express-session'),
MongoStore = require('connect-mongo')(session),
mongoose = require('mongoose')
require('./db/mongoose')
const Poll = require('./models/poll')
const socketio = require('socket.io'),
{addUser,removeUser,getUser} = require('./utils/users')

const app = express()
const server = http.createServer(app),
io = socketio(server)

const port = process.env.PORT,
publicDirectoryPath = path.join(__dirname,'../public')

// session
const sess = {
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new MongoStore({ mongooseConnection: mongoose.connections[0] })
}
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    // sess.cookie.secure = true; // serve secure cookies
    sess.cookie.maxAge = 1000 * 60 * 60 * 14; //14 days
}
app.use(session(sess));

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

app.get('/',(req,res)=>{
    let newUser=true
    if(req.session.viewedPolls){
        newUser=false
    }
    res.render('index',{
        pageTitle:'Pro Polls - Home',
        headerText:'Welcome to Pro Polls!',
        viewedPolls:req.session.viewedPolls,
        newUser
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

    try{
        await poll.save()
        res.status(201).send(poll)
    }catch(e){
        res.status(400).send(e)
    }
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

        //  viewed polls
        if(!req.session.viewedPolls) req.session.viewedPolls=[]
        const viewedPolls = req.session.viewedPolls
        const pollIndex = viewedPolls.map(obj=>obj.id).indexOf(req.params.id)
        if(pollIndex===-1){
            viewedPolls.unshift({id:req.params.id,title:poll.title})
            if(viewedPolls.length>5) viewedPolls.pop()
        }else{
            viewedPolls.splice(pollIndex,1)
            viewedPolls.unshift({id:req.params.id,title:poll.title})
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
        
        if(!req.session.sessionVotes) req.session.sessionVotes=[]
        const sessionVotes = req.session.sessionVotes
        if(sessionVotes.indexOf(req.params.id)!==-1){
            return res.status(400).send()
        }
        req.session.sessionVotes.push(req.params.id)

        const option = poll.options.find(o => o.option === req.body.option)
     
        option.votes+=1
       
        await poll.save()

        res.send(poll)
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



module.exports = app