import { expect, server, BASE_URL } from '../setup';

describe('API: Characters', () => {
  it('must return array of integers', done => {
    server
      .get(`${BASE_URL}/characters`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceOf(Array);
        expect(res.body[0]).to.be.a('number');
        
        done();
      });
  }).timeout(30000);
  
  it('must return a single character', done => {
    server
      .get(`${BASE_URL}/characters/1009146`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('description');
        done();
      });    
  });
  
  it('must error out on unknown id', done => {
    server
      .get(`${BASE_URL}/characters/0`)
      .expect(409)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('must error out on unknown id', done => {
    server
      .get(`${BASE_URL}/characters/batman`)
      .expect(409)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
