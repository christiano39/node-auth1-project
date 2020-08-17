const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function add(user) {
  return db("users")
    .insert(user)
    .returning("id")
    .then(([id]) => {
      return findById(id);
    });
}

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function findById(id) {
  return db("users").where({ id }).first();
}
