const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment')

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/anon-vote-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})

autoIncrement.initialize(connection)

const pollSchema = new Schema({
    title:String,
    options:[String],
    votes:[Number],
    multi:Boolean
})

pollSchema.plugin(autoIncrement.plugin,{model:'Poll',field:'id'})
const Poll = connection.model('Poll',pollSchema)

const poll1 = new Poll({
    title:'Yes or no?',
    options:['Yes','No'],
    votes:[0,0],
    multi:false
})

const poll2 = new Poll({
    title:'Hot or cold?',
    options:['Hot','Cold'],
    votes:[0,0],
    multi:false
})

poll1.save().then(()=>{
    console.log(poll1)
}).catch((error)=>{
    console.log('Error',error)
})

poll2.save().then(()=>{
    console.log(poll2)
}).catch((error)=>{
    console.log('Error',error)
})