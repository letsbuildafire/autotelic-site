import { Meteor } from 'meteor/meteor';
import assert from 'assert';

describe('autotelic', () => {
  it('package.json has correct name', async () => {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'autotelic');
  });

  if (Meteor.isClient) {
    it('client is not server', () => {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', () => {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
