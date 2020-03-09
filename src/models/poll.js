const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose)

const PollSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    options:{
        type:[String],
        required:true,
        validate(value){
            if(value.length<2){
                throw new Error('Options must have length of 2 or greater.')
            }
            for(var i=0; i<value.length; i++){
                if(value[i].length==0){
                    throw new Error('Options must be filled out.')
                }
            }
        }
    },
    votes:{
        type:[Number],
        required:true
    },
    multi:{
        type:Boolean,
        required:true
    }
})

PollSchema.plugin(AutoIncrement,{inc_field:'id'})
const Poll = mongoose.model('Poll',PollSchema)

module.exports = Poll