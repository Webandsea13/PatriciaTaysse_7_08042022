const express = require("express");
const router = express.Router();

//importation du middleware multer pour la gestion des fichiers image
const multer = require("../middlewares/multer-config");

const publicationControllers = require("../controllers/publication");

router.post("/", multer, publicationControllers.createPublication);

router.get("/", publicationControllers.readAllPublication);

// router.delete("/publication/id", publicationControllers.deletePublication);

// router.update("/publication/id", publicationControllers.modifyPublication);

module.exports = router;
