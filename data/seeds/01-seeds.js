exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "user", password: "pass" },
        { id: 2, username: "computer", password: "user" }
      ]);
    });
};
