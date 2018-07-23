const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: POST /api/users', () => {
  context('when sent data is ok', () => {
    it('creates and returns 201 and the new user', async () => {
      const { body , req } = await request()
        .post('/api/users')
        .send({
          uid: 6,
          name: 'New User',
          authority: 'user'
        })
        .expect(201);
      expect(body.id).to.exist;
      expect(body.profile.name).to.equal('New User');
      expect(body).to.have.all.keys('uid','profile','authority');
    });
  });

  context('when name is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/users')
        .expect(400);

      expect(body.type).to.equal('ValidationError');
      expect(body.details).to.have.lengthOf(3);
      expect(body.details[0].message).to.equal('"uid" is required');
    });
  });
});