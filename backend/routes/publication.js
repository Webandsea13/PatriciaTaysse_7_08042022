const express = require("express");
const router = require express.Router();

const publicationControllers = require("../controllers/publication");

router.post("/publication", publicationControllers.createPublication);



router.get("/publication", publicationControllers.readPublication);

router.delete("/publication/id", publicationControllers.deletePublication);

router.update("/publication/id", publicationControllers.modifyPublication);

