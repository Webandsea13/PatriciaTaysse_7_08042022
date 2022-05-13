const express = require("express");
const router = express.Router();
//importation du middleware multer pour la gestion des fichiers image
const multer = require("../middlewares/multer-config");
//importation authorize
const authorize = require("../middlewares/authorize");

const profilControllers = require("../controllers/profil");

router.post("/signup", profilControllers.signup);

router.post("/login", profilControllers.login);

router.get("/profil", profilControllers.readAllProfil);

router.get("/profil/:id", profilControllers.readOneProfil);

router.delete("/profil/:id", authorize, multer, profilControllers.deleteProfil);

//router.update("/profil/id", profilControllers.modifyProfil);

module.exports = router;
