const express = require("express");
const router = express.Router();

const profilControllers = require("../controllers/profil");

router.post("/signup", profilControllers.signup);

router.post("/login", profilControllers.login);

router.get("/profil", profilControllers.readProfil);

//router.delete("/profil/id", profilControllers.deleteProfil);

//router.update("/profil/id", profilControllers.modifyProfil);

module.exports = router;
