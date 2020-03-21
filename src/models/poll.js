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
    voters:[{
        ip_buffer:{
            type:Buffer,
            required: true,
        }
    }]
})

PollSchema.methods.toJSON = function(){
    const poll = this
    const pollObject = poll.toObject()

    delete pollObject.voters

    return pollObject
}

PollSchema.plugin(AutoIncrement,{inc_field:'id'})
const Poll = mongoose.model('Poll',PollSchema)

module.exports = Poll