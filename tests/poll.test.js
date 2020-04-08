const request = require('supertest')
const app = require('../src/apptest')
const Poll = require('../src/models/poll')

const pollOne = {
  title: 'Smackdown Vs Raw',
  options: [
    { option: 'Raw', votes: 0 },
    { option: 'Smackdown', votes: 0 },
  ],
  totalVotes: 0,
  dateCreated: new Date(),
}
/*
beforeEach(async () => {
   //await Poll.deleteMany()
   await new Poll(pollOne).save()
})
/*afterEach(() => {
    console.log('afterEach')
})*/

test('Should create a new poll', async () => {
  const response = await request(app)
    .post('/create')
    .send({
      title: 'Red or Blue',
      options: [
        {
          option: 'Red',
          votes: 0,
        },
        {
          option: 'Blue',
          votes: 0,
        },
      ],
      totalVotes: 0,
      dateCreated: new Date(),
    })
    .expect(201)

  // assert that database was changed correctly
  //const poll = await Poll.findById(response.body.poll_id)
  //expect(poll).not.toBeNull()
})

test('Should create existing poll', async () => {
  const response = await request(app)
    .post('/create')
    .send({
      title: pollOne.title,
      options: pollOne.options,
      totalVotes: pollOne.totalVotes,
      dateCreated: pollOne.dateCreated,
    })
    .expect(201)

  // assert that database was changed correctly
})

test('Should fetch all polls', async () => {
  const response = await request(app).get('/polls').expect(200)
})

test('Find a poll', async () => {
  const poll_id = 877 //Replace this value with your existing id to test
  const response = await request(app).get(`/polls/${poll_id}`).expect(200)
})

//Figuring this one out still econn keeps getting refused only for this one
test('Should update a poll', async () => {
  const poll_id = 877 //Replace this value with your existing id to test
  await request(app).patch(`polls/${poll_id}`).expect(200)
})

test('Should not find a poll', async () => {
  const poll_id = 180 //Replace this value with non existent id
  const response = await request(app).get(`/polls/${poll_id}`).expect(404)
})

test('Should not create a poll successfully', async () => {
  const response = await request(app)
    .post('/create')
    .send({
      title: '3 or 5',
      options: [
        {
          option: 3,
          votes: 'zero',
        },
        {
          option: 5,
          votes: 'zero',
        },
      ],
      totalVotes: 0,
      dateCreated: new Date(),
    })
    .expect(400)
})

test('Should fetch about page', async () => {
  await request(app).get('/about')
})

test('Should go to 404 page', async () => {
  await request(app).get('/have').expect(200)
})
