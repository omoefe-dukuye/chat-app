import { expect } from 'chai';

import { generateMessage, generateLocationMessage } from '../server/utils/generateMessage';
import validator from '../server/utils/validator';

describe('Generate Message', () => {
  it('Should generate correct message', () => {
    const { from, text } = { from: 'omoefe.dukuyeWgmail.com', text: 'I am good boy' };
    const res = generateMessage(from, text);

    expect(res.from).to.eql(from);
    expect(res.text).to.eql(text);
    expect(res.createdAt).to.be.a('number');
  });
});

describe('Generate Location Message', () => {
  it('Should generate correct message', () => {
    const { from, coords, coords: { latitude, longitude } } = { from: 'Omoefe', coords: { latitude: 34858485939, longitude: 88593939432 } };
    const res = generateLocationMessage(from, coords);

    expect(res.from).to.eql(from);
    expect(res.url).to.equal(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(res.createdAt).to.be.a('number');
  });
});

describe('Validator', () => {
  it('Should generate correct boolean', () => {
    expect(validator('random string')).to.equal(true);
    expect(validator('random string')).to.be.a('boolean');
    expect(validator('   ')).to.equal(false);
    expect(validator(' ', 'baloney')).to.equal(false);
  });
});
