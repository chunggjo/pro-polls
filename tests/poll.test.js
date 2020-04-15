const request = require('supertest')
const app = require('../src/server')
const Poll = require('../src/models/poll')

const pollOne = {
  title: 'Smackdown Vs Raw',
  options: [
    {
      option: 'Raw',
    },
    {
      option: 'Smackdown',
    },
  ],
}
beforeEach(async () => {
  await Poll.deleteMany()
  Poll.counterReset('id', function (err) {})
  await new Poll(pollOne).save()
})

test('Should create a new poll', async () => {
  await request(app).post('/create').send(pollOne).expect(201)
  // assert that database was changed correctly
  // const poll = await Poll.findById(response.body.poll_id)
  // expect(poll).not.toBeNull()
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
  await request(app).get('/polls/1').expect(200)
})

test('Should update a poll', async () => {
  await request(app).patch('/polls/1').send({ option: 'Raw' }).expect(200)
  const poll = await Poll.findOne({ id: 1 })
  expect(poll.options[0].votes).toEqual(1)
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
