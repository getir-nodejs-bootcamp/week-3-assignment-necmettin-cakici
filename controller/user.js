// Yorum satırlarının benzerleri movie controllerda var zaten.
var {
  fakeDB: { users },
} = require("../fakeDB.js");

const getAllUsers = (req, res) => {
  res.status(200).send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;
  let user = users.find((el) => el.id === Number(id));
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("Böyle bir kullanıcı yok.");
  }
};

const createUser = (req, res) => {
  let { userInfo } = req.body;
  if (userInfo.username && userInfo.password) {
    if (users.length > 0) {
      userInfo = { id: users[users.length - 1].id + 1, ...userInfo };
    } else {
      userInfo = { id: 1, ...userInfo };
    }
    users.push(userInfo);
    res.status(200).send(userInfo);
  } else {
    res.status(404).send("Hatalı kullanıcı bilgileri.");
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  let { userInfo } = req.body;
  let index = users.findIndex((el) => el.id === Number(id));
  console.log(`index`, index);
  if (index !== -1) {
    if (userInfo.username && userInfo.password) {
      users[index] = { id: users[index].id, ...userInfo };
      res.status(200).send({ id: users[index].id, ...userInfo });
    } else {
      res.status(404).send("Eksik bilgi girdiniz.");
    }
  } else {
    res.status(401).send("Böyle bir kullanıcı yok.");
  }
};

const patchUser = (req, res) => {
  const { id } = req.params;
  let { userInfo } = req.body;
  let index = users.findIndex((el) => el.id === Number(id));
  console.log(`index`, index);
  if (index !== -1) {
    users[index] = {
      id: users[index].id,
      username: userInfo.username ? userInfo.username : users[index].username,
      password: userInfo.password ? userInfo.password : users[index].password,
    };
    res.status(200).send({ id: users[index].id, ...userInfo });
  } else {
    res.status(401).send("Böyle bir kullanıcı yok.");
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  let index = users.findIndex((el) => el.id === Number(id));
  if (index !== -1) {
    users = users.filter((el) => el.id !== Number(id));
    res.status(200).send(users);
  } else {
    res.status(404).send("Böyle bir kullanıcı yok.");
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
};
