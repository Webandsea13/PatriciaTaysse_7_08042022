//importations
const express = require("express");

const helmet = require("helmet");

//accéder au path pour les images
const path = require("path");

//importation fichier database pour connexion à mySQL
const dbconnection = require("./db/db.js");

const app = express();
//faire les requetes au format json-(bodyparser inclus dans la version de express)
app.use(express.json());

//utiliser helmet pour protéger les requetes
app.use(helmet());

//importation des routes
const profilRoutes = require("./routes/profil");
const publicationRoutes = require("./routes/publication");
//const likeRoutes = require("./routes/like");
//const commentRoutes = require("./routes/comment");

//gérer les problèmes de CORS (cross origin request sharing)
app.use((req, res, next) => {
	res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization "
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

//route authentification signup et login et CRUD du profil
app.use("/api", profilRoutes);

//routes publication

app.use("/api/publication", publicationRoutes);

//routes commentaires

//routes likes

//routes images
app.use("/images", express.static(path.join(__dirname, "images")));

//gestion erreur globale
app.use(function (err, req, res, next) {
	res.status(500).send("Something broke!");
});

module.exports = app;
