require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

var { fakeDB } = require("./fakeDB");
const { loggingFunction } = require("./middlewares/logger");
const { authToken } = require("./middlewares/authToken");

app.use(bodyParser.json());

app.use(loggingFunction);

app.post("/signup", (req, res) => {
  let { userInfo } = req.body;
  if (userInfo.username && userInfo.password) {
    if (fakeDB.length > 0) {
      userInfo = { id: fakeDB[fakeDB.length - 1].id + 1, ...userInfo };
    } else {
      userInfo = { id: 1, ...userInfo };
    }
    fakeDB.push(userInfo);
    res.status(200).send(userInfo);
  } else {
    res.status(404).send("Hatalı kullanıcı bilgileri.");
  }
});

app.post("/login", (req, res) => {
  const { userInfo } = req.body;
  if (userInfo.username && userInfo.password) {
    const user = fakeDB.find((el) => el.username === userInfo.username);
    if (user) {
      if (user.password === userInfo.password) {
        const token = jwt.sign(user, "secretKey", { expiresIn: 200 });
        res.status(200).json(token);
      } else {
        res.status(404).send("Şifre hatalı.");
      }
    } else {
      res.status(404).send("Böyle bir kullanıcı yok.");
    }
  } else {
    res.status(404).send("Hatalı kullanıcı bilgileri.");
  }
});

// Users GET
app.get("/users", authToken, (req, res) => {
  res.status(200).send(fakeDB);
});

// Users GET Single user
app.get("/users/:id", authToken, (req, res) => {
  const { id } = req.params;
  let user = fakeDB.find((el) => el.id === Number(id));
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("Böyle bir kullanıcı yok.");
  }
});

// Users POST
// Bodyden bilgileri çekip auto-increment bi id'im olmadığı için bi kontrol mekanizmasıyla
// kontrol edip ona göre ekleme yapıyorum.
app.post("/users", authToken, async (req, res) => {
  let { userInfo } = req.body;
  if (userInfo.username && userInfo.password) {
    if (fakeDB.length > 0) {
      userInfo = { id: fakeDB[fakeDB.length - 1].id + 1, ...userInfo };
    } else {
      userInfo = { id: 1, ...userInfo };
    }
    fakeDB.push(userInfo);
    res.status(200).send(userInfo);
  } else {
    res.status(404).send("Hatalı kullanıcı bilgileri.");
  }
});

// Users DELETE
app.delete("/users/:id", authToken, async (req, res) => {
  const { id } = req.params;
  let index = fakeDB.findIndex((el) => el.id === Number(id));
  if (index !== -1) {
    fakeDB = fakeDB.filter((el) => el.id !== Number(id));
    res.status(200).send(fakeDB);
  } else {
    res.status(404).send("Böyle bir kullanıcı yok.");
  }
});

// Users PUT
app.put("/users/:id", authToken, async (req, res) => {
  const { id } = req.params;
  let { userInfo } = req.body;
  let index = fakeDB.findIndex((el) => el.id === Number(id));
  console.log(`index`, index);
  if (index !== -1) {
    fakeDB[index] = { id: fakeDB[index].id, ...userInfo };
    res.status(200).send({ id: fakeDB[index].id, ...userInfo });
  } else {
    res.status(401).send("Böyle bir kullanıcı yok.");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
