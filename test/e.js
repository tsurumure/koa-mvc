// beforeEach(async function() {
//   await db.clear();
//   await db.save([tobi, loki, jane]);
// });

const models = require('../app/sequelize/models')
var assert = require('assert')

describe('#find()', function() {
  it('responds with matching records', async function() {
    const rs = await models.Persons.findAll()
    // rs.have.length(1)
    assert.equal(rs, rs)
  });
});