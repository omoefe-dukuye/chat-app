import { expect } from 'chai';

import generateMessage from '../server/utils/generateMessage';

describe('Generate Message', () => {
  it('Should generate correct message', () => {
    const { from, text } = { from: 'omoefe.dukuyeWgmail.com', text: 'I am good boy' }
    const res = generateMessage(from, text);

    expect(res.from).to.eql(from);
    expect(res.text).to.eql(text);
    expect(res.createdAt).to.be.a('number');
  });
});