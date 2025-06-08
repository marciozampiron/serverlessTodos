const assert = require('assert');
const request = require('request');

describe('Create, Read, Delete', function() {
  this.timeout(5000);
  it('should create a new Todo, read it, & delete it', function(done) {
    const base = `https://${process.env.TODOS_ENDPOINT}/todos`;
    const desiredPayload = require('./data/newTodo1.json');

    // Create the new todo
    request.post({ url: base, json: desiredPayload }, (err, res, body) => {
      if (err) throw new Error(`Create call failed: ${err}`);
      assert.strictEqual(res.statusCode, 200, `Create Status Code != 200 (${res.statusCode})`);
      const id = body.id;

      // Read the item
      const specificUrl = `${base}/${id}`;
      request.get({ url: specificUrl, json: true }, (err, res, todo) => {
        if (err) throw new Error(`Read call failed: ${err}`);
        assert.strictEqual(res.statusCode, 200, `Read Status Code != 200 (${res.statusCode})`);
        assert.strictEqual(todo.text, desiredPayload.text, 'Read text != desired payload');

        // Delete the item
        request.del(specificUrl, (err, res) => {
          if (err) throw new Error(`Delete call failed: ${err}`);
          assert.strictEqual(res.statusCode, 200, `Delete Status Code != 200 (${res.statusCode})`);
          done();
        });
      });
    });
  });
});
