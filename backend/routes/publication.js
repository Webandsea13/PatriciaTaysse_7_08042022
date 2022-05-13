const express = require("express");
const router = express.Router();

//importation du middleware multer pour la gestion des fichiers image
const multer = require("../middlewares/multer-config");
//importation authorize
const authorize = require("../middlewares/authorize");

const publicationControllers = require("../controllers/publication");

router.post("/", multer, authorize, publicationControllers.createPublication);

router.get("/", authorize, publicationControllers.readAllPublication);

router.get("/:id", publicationControllers.readProfilPublication);

router.delete(
	"/:id",

	multer,
	publicationControllers.deletePublication
);

// router.update("/publication/id", publicationControllers.modifyPublication);

module.exports = router;
