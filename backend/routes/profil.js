const express = require("express");
const router = require express.Router();

const profilControllers = require("../controllers/profil");

router.post("/signup", profilControllers.signup);

router.post("/login", profilControllers.login);

router.get("/id", profilControllers.readProfil);

router.delete("/id", profilControllers.deleteProfil);

router.update("/id", profilControllers.modifyProfil);

