/* global api, describe, it, expect, beforeEach */
const User = require('../../../models/user');
const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

describe('POST /register', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => done());
  });

  it('should return a token', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect((res.body.token.split('.').length)).to.eq(3);
        done();
      });
  });
});
