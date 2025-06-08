const assert = require('assert');
const request = require('request');

describe('Create, Update, Delete', function() {
  this.timeout(5000);
  it('should create a new Todo, update it, verify the update, & delete it', function(done) {
    const base = `https://${process.env.TODOS_ENDPOINT}/todos`;
    const initialPayload = require('./data/newTodo1.json');

    // Create the new todo
    request.post({ url: base, json: initialPayload }, (err, res, body) => {
      if (err) throw new Error(`Create call failed: ${err}`);
      assert.strictEqual(res.statusCode, 200, `Create Status Code != 200 (${res.statusCode})`);
      const id = body.id;

      // Load update payload and update the item
      const updatePayload = require('./data/newTodo2.json');
      const specificUrl = `${base}/${id}`;
      request.put({ url: specificUrl, json: updatePayload }, (err, res, updated) => {
        if (err) throw new Error(`Update call failed: ${err}`);
        assert.strictEqual(res.statusCode, 200, `Update Status Code != 200 (${res.statusCode})`);
        assert.strictEqual(updated.text, updatePayload.text, 'Updated text != payload');

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
