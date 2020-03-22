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
        type:[{
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
        validate(value){
            if(value.length>8){
                throw new Error('options exceeds the limit of 8')
            }
            options = value.map(obj=>obj.option)
            if((new Set(options)).size !== options.length){
                throw new Error('options must be unique')
            }
        }
    }
})

PollSchema.plugin(AutoIncrement,{inc_field:'id'})
const Poll = mongoose.model('Poll',PollSchema)

module.exports = Poll