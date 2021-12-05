const express = require("express");
const router = express.Router();

// Controller'dan fonksiyonların importu
const {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  patchMovie,
  deleteMovie,
} = require("../controller/movie");

// Metodlara göre routerlar
router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.patch("/:id", patchMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
