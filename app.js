//Paket,route ve middleware importları
require("dotenv").config();
const express = require("express");
const app = express();

const loginRoutes = require("./routes/loginRoutes.js");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

const { loggingFunction } = require("./middlewares/logger");
const { authToken } = require("./middlewares/authToken");

//req.body'den json çekmemiz için middleware:
app.use(express.json());

//Log middleware'imi her istekten önce çalıştırması:
app.use(loggingFunction);

//Routelara yönlendirme
app.use("/", loginRoutes);
app.use("/user", authToken, userRoutes);
app.use("/movie", authToken, movieRoutes);

//App'i ayağa kaldırıp port'u dinleme
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
