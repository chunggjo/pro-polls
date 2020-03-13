const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose)

const PollSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    options:[{
        option:{
            type:String,
            required:true,
            trim:true
        },
        votes:{
            type:Number,
            required:true
        }
    }],
    voters:{
        type:[String],
        required:true
    }
})

PollSchema.pre('save',async function(next){
    const poll = this

    console.log('from middleware')
    // encrypt ip

    next()
})

PollSchema.plugin(AutoIncrement,{inc_field:'id'})
const Poll = mongoose.model('Poll',PollSchema)

module.exports = Poll