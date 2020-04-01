const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Filter = require('bad-words'),
filter = new Filter()

const PollSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		validate(value){
			if(filter.isProfane(value)){
				throw new Error('Please keep inappropriate words out of title.')
			}
		}
	},
	options: {
		type: [
			{
				option: {
					type: String,
					required: true,
					trim: true
				},
				votes: {
					type: Number,
					required: true,
					default: 0
				}
			}
		],
		validate(value) {
			if (value.length > 8) {
				throw new Error('Options exceeds the limit of 8.')
			}

			options = value.map(obj => obj.option)
			if (new Set(options).size !== options.length) {
				throw new Error('Options must be unique.')
			}

			for(let i=0; i<value.length; i++){
				if(filter.isProfane(value[i].option)){
					throw new Error('Please keep inappropriate words out of options.')
				}
			}
	
		}
	},
	totalVotes: {
		type: Number,
		required: true,
		default: 0
	},
	dateCreated: {
		type: Date,
		required: true,
		default: new Date()
	}
})

PollSchema.pre('save', async function(next) {
	const poll = this

	if (poll.isNew) {
		poll.totalVotes = 0
		// Ensure votes are zero when poll is new
		options = poll.options
		for (let i = 0; i < options.length; i++) {
			options[i].votes = 0
		}

		// Ensure date is the current date
		poll.dateCreated = new Date()

		return next()
	}

	if (poll.isModified('options')) {
		poll.totalVotes++
	}

	next()
})

PollSchema.plugin(AutoIncrement, { inc_field: 'id' })
const Poll = mongoose.model('Poll', PollSchema)

module.exports = Poll
