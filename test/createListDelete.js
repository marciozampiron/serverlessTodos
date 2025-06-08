var assert = require('assert');
var request = require('request');
var fs = require('fs');

describe('Create, List, Delete', function() {
  this.timeout(5000);

  it('should create a new Todo, list it, & delete it', function(done) {
    // Build the base URL
    var base = "https://" + process.env.TODOS_ENDPOINT + "/todos";

    // Load payload
    var desiredPayload = JSON.parse(fs.readFileSync("./test/data/newTodo1.json", "utf8"));

    // Step 1: Create the new todo
    request.post({
      url: base,
      json: desiredPayload
    }, function(err, res, body) {
      if (err) throw new Error("Create call failed: " + err);
      assert.strictEqual(res.statusCode, 200, "Create Status Code != 200 (" + res.statusCode + ")");
      var createdId = body.id;

      // Step 2: List all todos
      request.get({ url: base, json: true }, function(err, res, list) {
        if (err) throw new Error("List call failed: " + err);
        assert.strictEqual(res.statusCode, 200, "List Status Code != 200 (" + res.statusCode + ")");
        
        // Find the item with the matching ID
        var found = list.find(function(item) {
          return item.id === createdId && item.text === desiredPayload.text;
        });
        assert.ok(found, "New item not found in list.");

        // Step 3: Delete the created todo
        request.del(base + "/" + createdId, function(err, res) {
          if (err) throw new Error("Delete call failed: " + err);
          assert.strictEqual(res.statusCode, 200, "Delete Status Code != 200 (" + res.statusCode + ")");
          done();
        });
      });
    });
  });
});
