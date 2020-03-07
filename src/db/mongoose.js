const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/anon-vote-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const Poll = mongoose.model('Poll',{
    title:{
        type:String
    },
    options:{
        type:[String]
    },
    votes:{
        type:[Number]
    },
    multi:{
        type:Boolean
    }
})

const poll1 = new Poll({
    title:'Do you like me?',
    options:['Yes','No'],
    votes:[0,0],
    multi:false
})

poll1.save().then(()=>{
    console.log(poll1)
}).catch((error)=>{
    console.log('Error',error)
})