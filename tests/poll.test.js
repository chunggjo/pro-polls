const request = require('supertest')
const app = require('../src/app')
const Poll = require('../src/models/poll')
const server = require('../src/server')
const db = require('mongodb')

const pollOne = {
    title: 'Smackdown Vs Raw',
    options: 
    [{option: 'Raw', votes: 0},
     {option: 'Smackdown', votes: 0}],
     totalVotes: 0,
     id: 0
}

// beforeEach(async () => {
//    await Poll.deleteMany()
//    await new Poll(pollOne).save()
// })

/*afterEach(() => {
    console.log('afterEach')
})*/



test('Should create a new poll', async () => {
   const response =  await request(app).post('/create').send({
        title: 'Red or Blue',
        options: [
            {
                option: 'Red',
                votes: 0
            },
            {
                option: 'Blue',
                votes: 0
            }
        ],
        totalVotes: 0,
        id: 0
        
    }).expect(201)

    // assert that database was changed correctly
    //const poll = await Poll.findById(response.body.poll_id)
    //expect(poll).not.toBeNull()

})

test('Should create existing poll', async () => {
    const response =  await request(app).post('/create').send({
         title: pollOne.title,
         options: pollOne.options,
         totalVotes: pollOne.totalVotes,
         id: pollOne.id
  
     }).expect(201)
 
     // assert that database was changed correctly
     
 
 })



test('Should fetch all polls', async () => {
    const response = await request(app).get('/polls').expect(200)
    
})

//Struggling with this
test('Find a poll', async (req, res) => {
    const pollID = await Poll.findOne({id: req.params.id})
    const response = await request(app)
    .get(`/polls/${pollID}`).expect(200)
  })



test('Should update a poll', async () => {
    const res = await request(app)
        .patch('polls/:5e79190a9a8bdf5bf04e4da9')
        .send({
        options: [
            {option: 'Raw', votes: 1}
        ]
        }).expect(200)
    })