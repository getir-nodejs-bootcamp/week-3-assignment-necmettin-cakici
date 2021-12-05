const express = require("express");
const router = express.Router();

// Controller'dan fonksiyonların importu
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} = require("../controller/user.js");

// Metodlara göre routerlar
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

module.exports = router;
