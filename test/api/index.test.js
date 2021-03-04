import { expect, server, BASE_URL } from '../setup';

describe('API" Index page', () => {
  it('site must be up', done => {
    server
      .get(`${BASE_URL}/`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('UP');
        done();
      });
  });
});
