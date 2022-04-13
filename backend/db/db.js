const dotenv = require("dotenv").config();

const mysql = require("mysql2");
const dbconnection = mysql.createConnection({
	host: "localhost",
	database: "reseau_social",
	user: "root",
	password: "JutiliseMySQL!",
});

dbconnection.connect((err) => {
	if (err) {
		console.log("La connexion a échoué");
		console.log(err);
	} else {
		console.log("Connexion à la base de données RESEAU_SOCIAL réussie !");
	}
});

module.exports = dbconnection;
