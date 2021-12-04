const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      jwt.verify(token, "secretKey", (err) => {
        if (err) {
          return res.status(403).send("JWT hatalı");
        } else {
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(403).send("Token gerekli.");
  }
};

module.exports = { authToken };
