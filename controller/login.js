const jwt = require("jsonwebtoken");
// Destructuring ile fakeDB den users arrayi çekimi
var {
  fakeDB: { users },
} = require("../fakeDB.js");

const login = (req, res) => {
  const { userInfo } = req.body;
  if (userInfo.username && userInfo.password) {
    // FakeDB'mizde girilen username'de bir kayıt var mı?
    const user = users.find((el) => el.username === userInfo.username);
    if (user) {
      if (user.password === userInfo.password) {
        // Varsa şifre db ile eşleşiyor mu ve token oluşturulması.
        const token = jwt.sign(user, "secretKey", { expiresIn: 20000 });
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
};

// Body'den gelen bilgilerle kullanıcı kayıt etme.
const signup = (req, res) => {
  let { userInfo } = req.body;
  if (userInfo.username && userInfo.password) {
    if (users.length > 0) {
      // Aynı kullanıcı adı daha önceden var mı diye kontrol
      if (users.some((user) => user.username === userInfo.username)) {
        return res.status(404).send("Böyle bir kullanıcı zaten var");
      } else {
        userInfo = {
          id: users[users.length - 1].id + 1,
          ...userInfo,
        };
      }
    } else {
      userInfo = { id: 1, ...userInfo };
    }

    users.push(userInfo);
    res.status(200).send(userInfo);
  } else {
    res.status(404).send("Hatalı kullanıcı bilgileri.");
  }
};

module.exports = { login, signup };
