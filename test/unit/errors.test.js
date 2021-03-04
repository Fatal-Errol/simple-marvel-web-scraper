import { errorParser } from '../../src/services/marvel_scraper';
import { apiError, serverError } from '../data/characters';
import { expect } from '../setup';


describe('Errors', () => {
  it('must interpret server error', done => {
    const output = errorParser(serverError);
    
    expect(output).to.be.instanceOf(Object);
    expect(output).to.have.property('code');
    expect(output).to.have.property('message');
    expect(output).to.have.property('trace');
    
    expect(output.code).to.be.a('number');
    expect(output.message).to.be.a('string');
    done();
  });

  it('must interpret marvel error', done => {
    const output = errorParser(apiError);

    expect(output).to.be.instanceOf(Object);
    expect(output).to.have.property('code');
    expect(output).to.have.property('message');
    expect(output).to.have.property('trace');

    expect(output.code).to.be.a('number');
    expect(output.message).to.be.a('string');
    done();
  });
});

