const argon2 = require("argon2");
const secret = require("./secret.js");
const jwt = require("jsonwebtoken");

function login(req, res) {
  const db = req.app.get("db");

  const { username, password } = req.body;

  db.users
    .findOne(
      {
        username
      },
      {
        fields: ["id", "username", "email", "password"]
      }
    )
    .then(user => {
      if (!user) {
        throw new Error("Invalid Username");
      }
      return argon2.verify(user.password, password).then(valid => {
        if (!valid) {
          throw new Error("Invalid Password");
        }

        const token = jwt.sign({ userId: user.id }, secret);
        delete user.password;
        res.status(201).json({ ...user, token });
      });
    })
    .catch(error => {
      if (["Invalid username", "Incorrect password"].includes(error.message)) {
        res.status(200).json({ err: error.message });
      } else {
        console.error(error);
        res.status(500).end();
      }
    });
}
module.exports = {
  login
};
