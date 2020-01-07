const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("./secret.js");

function userRegister(req, res) {
  const db = req.app.get("db");

  const { username, email, password } = req.body;
  argon2
    .hash(password)
    .then(hash => {
      return db.users.insert(
        {
          username,
          email,
          password: hash
        },
        {
          fields: ["id", "username", "email"] // never want to return the password hash
        }
      );
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret);
      res.status(201).json({ ...user, token });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
  //   db.users
  //     .insert({ username, email, password })
  //     .then(register => res.status(201).json(register))
  //     .catch(err => {
  //       console.error(err); // if something happens we handle the error as well.
  //       res.status(500).end();
  //     });
}

function protectedData(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret); // will throw an Error when token is invalid!!!
    res.status(200).json({ data: "here is the protected data" });
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}

module.exports = {
  userRegister,
  protectedData
};
