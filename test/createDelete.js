const assert = require('assert');
const request = require('request');

describe('Create, Delete', function() {
  this.timeout(5000);

  it('should create a new Todo, & delete it', function(done) {
    const base = `https://${process.env.TODOS_ENDPOINT}/todos`;
    const payload = require('./data/newTodo1.json');

    // Create the new todo
    request.post({ url: base, json: payload }, (err, res, body) => {
      if (err) throw new Error(`Create call failed: ${err}`);
      assert.strictEqual(res.statusCode, 200, `Create Status Code != 200 (${res.statusCode})`);
      const id = body.id;

      // Delete the created todo
      const deleteUrl = `${base}/${id}`;
      request.del({ url: deleteUrl }, (err, res) => {
        if (err) throw new Error(`Delete call failed: ${err}`);
        assert.strictEqual(res.statusCode, 200, `Delete Status Code != 200 (${res.statusCode})`);
        done();
      });
    });
  });
});
