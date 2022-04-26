const express = require("express");
const router = express.Router();

const publicationControllers = require("../controllers/publication");

router.post("/", publicationControllers.createPublication);

// router.get("/publication", publicationControllers.readPublication);

// router.delete("/publication/id", publicationControllers.deletePublication);

// router.update("/publication/id", publicationControllers.modifyPublication);

module.exports = router;
